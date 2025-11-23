import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import { UnsplashClient } from './unsplash_client.js';
import dotenv from 'dotenv';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import nlp from 'compromise';

dotenv.config();

const argv = yargs(hideBin(process.argv))
    .option('dir', {
        alias: 'd',
        type: 'string',
        description: 'Target directory to scan',
        default: '.'
    })
    .option('key', {
        alias: 'k',
        type: 'string',
        description: 'Unsplash Access Key'
    })
    .help()
    .argv;

async function loadConfig(targetDir) {
    const configPath = path.join(targetDir, 'unsplash.config.json');
    try {
        const data = await fs.readFile(configPath, 'utf-8');
        console.log(`Loaded config from ${configPath}`);
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

function extractTextFromHtml(html) {
    const $ = cheerio.load(html);
    return $('title').text() + ' ' + $('h1').text() + ' ' + $('p').first().text();
}

function extractTextFromJsx(content) {
    // Simple extraction of text inside tags or variables
    // This is a heuristic
    const text = content.replace(/<[^>]+>/g, ' ').replace(/\{[^}]+\}/g, ' ');
    return text.slice(0, 1000); // Limit to first 1000 chars to avoid noise
}

async function getBestKeyword(content, ext) {
    let text = '';
    if (ext === '.html') {
        text = extractTextFromHtml(content);
    } else {
        text = extractTextFromJsx(content);
    }

    const doc = nlp(text);
    const topics = doc.topics().out('array');
    if (topics.length > 0) return topics[0];

    const nouns = doc.nouns().out('array');
    // Filter out common coding terms
    const cleanNouns = nouns.filter(n => !['component', 'page', 'layout', 'return', 'import', 'export', 'const', 'function'].includes(n.toLowerCase()));
    if (cleanNouns.length > 0) return cleanNouns[0];

    return 'nature'; // Default fallback
}

async function processArticle($, element, client, targetDir, imageDestDir, filePath) {
    const sections = [];
    let currentSection = { header: null, text: '', element: null };

    $(element).children().each((i, el) => {
        const tagName = $(el).prop('tagName').toLowerCase();
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
            if (currentSection.header || currentSection.text) {
                sections.push(currentSection);
            }
            currentSection = { header: $(el).text(), text: '', element: el };
        } else {
            currentSection.text += $(el).text() + ' ';
        }
    });
    if (currentSection.header || currentSection.text) {
        sections.push(currentSection);
    }

    for (const section of sections) {
        // Skip if section already has an image
        // This is a bit tricky with cheerio traversal, simplified check:
        // We assume if we inserted it, it's there. 
        // Real implementation might need to check next siblings.

        const textToAnalyze = (section.header || '') + ' ' + section.text;
        if (textToAnalyze.trim().length < 20) continue; // Skip short sections

        const query = await getBestKeyword(textToAnalyze, '.html'); // Reuse helper
        console.log(`Processing section "${section.header || 'Intro'}". Query: "${query}"`);

        try {
            const photos = await client.searchPhotos(query, 1);
            if (photos.length > 0) {
                const photo = photos[0];
                const cleanQuery = query.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                const destDir = path.join(targetDir, imageDestDir, cleanQuery);
                const destFileName = `${photo.id}.jpg`;
                const destFile = path.join(destDir, destFileName);

                try {
                    await fs.access(destFile);
                } catch {
                    await client.downloadImage(photo.urls.regular, destFile);
                    await client.trackDownload(photo.links.download_location);
                    console.log(`Downloaded: ${destFile}`);
                }

                let webPath = path.relative(path.dirname(filePath), destFile);
                webPath = webPath.split(path.sep).join('/');

                const imgTag = `<img src="${webPath}" alt="${query}" class="unsplash-article-image" style="max-width: 100%; height: auto; margin: 1em 0;">`;

                if (section.element) {
                    $(section.element).after(imgTag);
                } else {
                    $(element).prepend(imgTag);
                }
            }
        } catch (e) {
            console.error(`Failed to process section:`, e.message);
        }
    }
}

async function scanAndFill() {
    const targetDir = path.resolve(argv.dir);
    const config = await loadConfig(targetDir);
    const accessKey = argv.key || config.accessKey || process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
        console.error('Error: Unsplash Access Key is required. Provide it via --key, UNSPLASH_ACCESS_KEY env var, or unsplash.config.json');
        process.exit(1);
    }

    const client = new UnsplashClient(accessKey);
    const imageDestDir = config.imageDestination || 'public/images/unsplash';

    console.log(`Scanning directory: ${targetDir}`);

    const files = await glob('**/*.{html,jsx,tsx}', {
        cwd: targetDir,
        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**', '**/public/**']
    });

    console.log(`Found ${files.length} files.`);

    for (const file of files) {
        const filePath = path.join(targetDir, file);
        let content = await fs.readFile(filePath, 'utf-8');
        const ext = path.extname(file);
        let modified = false;

        // 1. Handle Article Segmentation (HTML only for now)
        if (ext === '.html' && content.includes('data-unsplash-article')) {
            const $ = cheerio.load(content);
            const articles = $('[data-unsplash-article]');

            if (articles.length > 0) {
                console.log(`Found ${articles.length} articles in ${file}`);
                for (let i = 0; i < articles.length; i++) {
                    await processArticle($, articles[i], client, targetDir, imageDestDir, filePath);
                }
                content = $.html();
                modified = true;
            }
        }

        // 2. Handle Individual Placeholders
        // Regex to find images with data-unsplash attributes
        // Supports: <img ... data-unsplash-auto ... > or <img ... data-unsplash-search="term" ... >
        // We use a global regex to find all instances
        const imgRegex = /<img\s+[^>]*data-unsplash-(auto|search)(?:=["']([^"']*)["'])?[^>]*>/gi;

        let match;
        // We need to handle replacements carefully. 
        // Since strings are immutable, we'll build a list of replacements and apply them.
        const replacements = [];

        while ((match = imgRegex.exec(content)) !== null) {
            const fullTag = match[0];
            // Skip if already processed (has src) - simple check
            if (fullTag.includes('src=') && !fullTag.includes('data-unsplash-auto') && !fullTag.includes('data-unsplash-search')) {
                continue;
            }

            const type = match[1]; // 'auto' or 'search'
            const param = match[2]; // The search term if type is search

            let query = '';
            if (type === 'search' && param) {
                query = param;
            } else {
                // Auto mode: analyze content
                query = await getBestKeyword(content, ext);
            }

            console.log(`Found placeholder in ${file}. Query: "${query}"`);

            try {
                const photos = await client.searchPhotos(query, 1);
                if (photos.length > 0) {
                    const photo = photos[0];
                    const cleanQuery = query.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                    const destDir = path.join(targetDir, imageDestDir, cleanQuery);
                    const destFileName = `${photo.id}.jpg`;
                    const destFile = path.join(destDir, destFileName);

                    // Download if not exists
                    try {
                        await fs.access(destFile);
                    } catch {
                        await client.downloadImage(photo.urls.regular, destFile);
                        await client.trackDownload(photo.links.download_location);
                        console.log(`Downloaded: ${destFile}`);
                    }

                    // Calculate relative path for src
                    // We use path.relative to get the path from the file to the image
                    let webPath = path.relative(path.dirname(filePath), destFile);

                    // Ensure forward slashes for web compatibility (Windows fix)
                    webPath = webPath.split(path.sep).join('/');

                    // Replace src attribute or add it
                    let newTag = fullTag;
                    if (newTag.match(/src=["'][^"']*["']/)) {
                        newTag = newTag.replace(/src=["'][^"']*["']/, `src="${webPath}"`);
                    } else {
                        newTag = newTag.replace('<img', `<img src="${webPath}"`);
                    }

                    // Remove the data attribute to mark as processed? 
                    // Or keep it to allow re-running? Let's keep it but maybe update the query if auto.

                    replacements.push({ start: match.index, end: match.index + fullTag.length, newText: newTag });
                    modified = true;
                }
            } catch (e) {
                console.error(`Failed to process image for ${file}:`, e.message);
            }
        }

        // Apply replacements in reverse order to preserve indices
        if (modified && replacements.length > 0) {
            replacements.sort((a, b) => b.start - a.start);
            for (const rep of replacements) {
                content = content.substring(0, rep.start) + rep.newText + content.substring(rep.end);
            }
        }

        if (modified) {
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`Updated ${file}`);
        }
    }
}

scanAndFill();
