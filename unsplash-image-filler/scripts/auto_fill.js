import { glob } from "glob";
import fs from "fs/promises";
import path from "path";
import * as cheerio from "cheerio";
import { UnsplashClient } from "./unsplash_client.js";
import dotenv from "dotenv";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import nlp from "compromise";

dotenv.config();

const argv = yargs(hideBin(process.argv))
  .option("dir", {
    alias: "d",
    type: "string",
    description: "Target directory to scan",
    default: ".",
  })
  .option("key", {
    alias: "k",
    type: "string",
    description: "Unsplash Access Key (single key)",
  })
  .option("keys", {
    type: "string",
    description: "Comma-separated Unsplash Access Keys (key pool)",
  })
  .option("dry-run", {
    type: "boolean",
    description: "Preview operations without making changes",
    default: false,
  })
  .help().argv;

// Statistics tracking
const stats = {
  filesScanned: 0,
  filesModified: 0,
  filesSkipped: 0,
  filesFailed: 0,
  imagesHotlinked: 0,
  errors: [],
};

async function loadConfig(targetDir) {
  const configPath = path.join(targetDir, "unsplash.config.json");
  try {
    const data = await fs.readFile(configPath, "utf-8");
    console.log(`Loaded config from ${configPath}`);
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

function parseAccessKeys(rawValue) {
  if (!rawValue) return [];
  if (Array.isArray(rawValue)) {
    return rawValue.flatMap((item) => parseAccessKeys(item));
  }

  return String(rawValue)
    .split(/[,\n;]/)
    .map((key) => key.trim())
    .filter(Boolean);
}

function resolveAccessKeys(config) {
  const dedupe = (keys) => [...new Set(keys)];

  // Priority: CLI -> ENV -> config
  const cliKeys = [
    ...parseAccessKeys(argv.keys),
    ...parseAccessKeys(argv.key),
  ];
  if (cliKeys.length > 0) return dedupe(cliKeys);

  const envKeys = [
    ...parseAccessKeys(process.env.UNSPLASH_ACCESS_KEYS),
    ...parseAccessKeys(process.env.UNSPLASH_ACCESS_KEY),
  ];
  if (envKeys.length > 0) return dedupe(envKeys);

  const configKeys = [
    ...parseAccessKeys(config.accessKeys),
    ...parseAccessKeys(config.accessKey),
  ];
  return dedupe(configKeys);
}

function extractTextFromHtml(html) {
  const $ = cheerio.load(html);
  return $("title").text() + " " + $("h1").text() + " " + $("p").first().text();
}

function extractTextFromJsx(content) {
  // Simple extraction of text inside tags or variables
  // This is a heuristic
  const text = content.replace(/<[^>]+>/g, " ").replace(/\{[^}]+\}/g, " ");
  return text.slice(0, 1000); // Limit to first 1000 chars to avoid noise
}

function stableHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

async function getBestKeyword(content, ext) {
  let text = "";
  if (ext === ".html") {
    text = extractTextFromHtml(content);
  } else {
    text = extractTextFromJsx(content);
  }

  const doc = nlp(text);
  const topics = doc.topics().out("array");
  if (topics.length > 0) return topics[0];

  const nouns = doc.nouns().out("array");
  // Filter out common coding terms
  const cleanNouns = nouns.filter(
    (n) =>
      ![
        "component",
        "page",
        "layout",
        "return",
        "import",
        "export",
        "const",
        "function",
      ].includes(n.toLowerCase()),
  );
  if (cleanNouns.length > 0) return cleanNouns[0];

  return "nature"; // Default fallback
}

function normalizeArticleMode(rawMode) {
  const value = (rawMode || "").trim().toLowerCase();
  if (!value) return "sections";
  if (["sections", "section", "headings", "heading"].includes(value)) {
    return "sections";
  }
  if (["paragraphs", "paragraph", "paras"].includes(value)) {
    return "paragraphs";
  }
  if (value === "auto") return "auto";
  return "sections";
}

function buildSectionsByHeadings($, element) {
  const sections = [];
  let currentSection = { header: null, text: "", element: null };

  $(element)
    .children()
    .each((i, el) => {
      const tagName = $(el).prop("tagName").toLowerCase();
      if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
        if (currentSection.header || currentSection.text) {
          sections.push(currentSection);
        }
        currentSection = { header: $(el).text(), text: "", element: el };
      } else {
        currentSection.text += $(el).text() + " ";
      }
    });

  if (currentSection.header || currentSection.text) {
    sections.push(currentSection);
  }

  return sections;
}

function buildSectionsByParagraphs($, element) {
  const sections = [];
  let currentHeader = null;

  $(element)
    .children()
    .each((i, el) => {
      const tagName = $(el).prop("tagName").toLowerCase();
      if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
        currentHeader = $(el).text();
        return;
      }

      if (tagName === "p") {
        const text = $(el).text();
        if (!text.trim()) return;
        sections.push({ header: currentHeader, text, element: el });
      }
    });

  return sections;
}

function chooseSmartParagraphSections(sections, filePath) {
  const eligible = sections.filter((section) => {
    const textToAnalyze = (section.header || "") + " " + section.text;
    return textToAnalyze.trim().length >= 20;
  });

  const count = eligible.length;
  if (count === 0) return [];

  let targetCount = 1;
  if (count < 6) {
    targetCount = 1;
  } else if (count < 12) {
    targetCount = 2;
  } else if (count < 20) {
    targetCount = 3;
  } else {
    targetCount = Math.min(5, Math.max(4, Math.round(count / 6)));
  }

  targetCount = Math.min(targetCount, count);

  const skipEdges = count >= 5 ? 1 : 0;
  const span = Math.max(1, count - skipEdges * 2);
  const interval = Math.max(2, Math.floor(span / targetCount));
  const seed = stableHash(`${filePath}:${count}`);
  const offset = seed % interval;

  const selected = [];
  let startIndex = skipEdges + offset;
  if (startIndex >= count - skipEdges) startIndex = skipEdges;

  for (let idx = startIndex; idx < count - skipEdges; idx += interval) {
    selected.push(eligible[idx]);
    if (selected.length >= targetCount) break;
  }

  if (selected.length === 0) {
    selected.push(eligible[Math.min(skipEdges, count - 1)]);
  }

  return selected;
}

async function processArticle(
  $,
  element,
  client,
  targetDir,
  filePath,
  dryRun,
  mode,
) {
  let resolvedMode = mode;
  if (resolvedMode === "auto") {
    const hasHeadings =
      $(element).children("h1,h2,h3,h4,h5,h6").length > 0;
    resolvedMode = hasHeadings ? "sections" : "paragraphs";
  }

  const sections =
    resolvedMode === "paragraphs"
      ? buildSectionsByParagraphs($, element)
      : buildSectionsByHeadings($, element);

  const useSmartDensity = mode === "auto" && resolvedMode === "paragraphs";
  const sectionsToProcess = useSmartDensity
    ? chooseSmartParagraphSections(sections, filePath)
    : sections;

  for (const section of sectionsToProcess) {
    const textToAnalyze = (section.header || "") + " " + section.text;
    if (textToAnalyze.trim().length < 20) continue; // Skip short sections

    const query = await getBestKeyword(textToAnalyze, ".html");
    console.log(
      `Processing section "${section.header || "Intro"}". Query: "${query}"`,
    );

    if (dryRun) {
      console.log(
        `[DRY-RUN] Would search for "${query}" and insert image after section`,
      );
      continue;
    }

    try {
      const nextElement = $(section.element).next();
      if (
        nextElement &&
        nextElement.is("img[data-unsplash-processed]")
      ) {
        continue;
      }

      const photos = await client.searchPhotos(query, 1);
      if (photos.length > 0) {
        const photo = photos[0];
        const photoUrl = photo?.urls?.regular;
        if (!photoUrl) continue;

        await client.trackDownload(photo.links.download_location);
        stats.imagesHotlinked++;

        const imgTag = `<img src="${photoUrl}" alt="${query}" class="unsplash-article-image" data-unsplash-id="${photo.id}" data-unsplash-processed="true" loading="lazy" style="max-width: 100%; height: auto; margin: 1em 0;">`;

        if (section.element) {
          $(section.element).after(imgTag);
        } else {
          $(element).prepend(imgTag);
        }
      }
    } catch (e) {
      console.error(`Failed to process section:`, e.message);
      stats.errors.push({
        file: filePath,
        section: section.header,
        error: e.message,
      });
    }
  }
}

async function processFile(file, targetDir, client, dryRun) {
  const filePath = path.join(targetDir, file);
  let content;

  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch (e) {
    console.error(`Failed to read ${file}: ${e.message}`);
    stats.filesFailed++;
    stats.errors.push({ file, error: `Read failed: ${e.message}` });
    return;
  }

  const ext = path.extname(file);
  let modified = false;

  // 1. Handle Article Segmentation (HTML only for now)
  if (ext === ".html" && content.includes("data-unsplash-article")) {
    const $ = cheerio.load(content);
    const articles = $("[data-unsplash-article]");

    if (articles.length > 0) {
      console.log(`Found ${articles.length} article(s) in ${file}`);
      for (let i = 0; i < articles.length; i++) {
        const rawMode = $(articles[i]).attr("data-unsplash-article");
        const mode = normalizeArticleMode(rawMode);
        await processArticle(
          $,
          articles[i],
          client,
          targetDir,
          filePath,
          dryRun,
          mode,
        );
      }
      if (!dryRun) {
        content = $.html();
        modified = true;
      }
    }
  }

  // 2. Handle Individual Placeholders
  // Regex to find images with data-unsplash attributes that haven't been processed
  // Supports: <img ... data-unsplash-auto ... > or <img ... data-unsplash-search="term" ... >
  const imgRegex =
    /<img\s+[^>]*data-unsplash-(auto|search)(?:=["']([^"']*)["'])?[^>]*>/gi;

  let match;
  const replacements = [];

  while ((match = imgRegex.exec(content)) !== null) {
    const fullTag = match[0];

    // Skip if already processed (has data-unsplash-processed attribute)
    if (fullTag.includes("data-unsplash-processed")) {
      stats.filesSkipped++;
      continue;
    }

    const type = match[1]; // 'auto' or 'search'
    const param = match[2]; // The search term if type is search

    let query = "";
    if (type === "search" && param) {
      query = param;
    } else {
      // Auto mode: analyze content
      query = await getBestKeyword(content, ext);
    }

    console.log(`Found placeholder in ${file}. Query: "${query}"`);

    if (dryRun) {
      console.log(`[DRY-RUN] Would search for "${query}" and update image src`);
      continue;
    }

    try {
      const photos = await client.searchPhotos(query, 1);
      if (photos.length > 0) {
        const photo = photos[0];
        const photoUrl = photo?.urls?.regular;
        if (!photoUrl) continue;

        await client.trackDownload(photo.links.download_location);
        stats.imagesHotlinked++;

        // Build new tag with src and processed marker
        let newTag = fullTag;

        // Add or update src attribute
        if (newTag.match(/src=["'][^"']*["']/)) {
          newTag = newTag.replace(/src=["'][^"']*["']/, `src="${photoUrl}"`);
        } else {
          newTag = newTag.replace("<img", `<img src="${photoUrl}"`);
        }

        if (!newTag.includes("data-unsplash-id")) {
          newTag = newTag.replace(
            "<img",
            `<img data-unsplash-id="${photo.id}"`,
          );
        }

        // Add processed marker to prevent re-processing
        if (!newTag.includes("data-unsplash-processed")) {
          newTag = newTag.replace(
            "<img",
            '<img data-unsplash-processed="true"',
          );
        }

        replacements.push({
          start: match.index,
          end: match.index + fullTag.length,
          newText: newTag,
        });
        modified = true;
      }
    } catch (e) {
      console.error(`Failed to process image for ${file}:`, e.message);
      stats.errors.push({ file, error: e.message });
    }
  }

  // Apply replacements in reverse order to preserve indices
  if (modified && replacements.length > 0) {
    replacements.sort((a, b) => b.start - a.start);
    for (const rep of replacements) {
      content =
        content.substring(0, rep.start) +
        rep.newText +
        content.substring(rep.end);
    }
  }

  if (modified && !dryRun) {
    try {
      await fs.writeFile(filePath, content, "utf-8");
      console.log(`Updated ${file}`);
      stats.filesModified++;
    } catch (e) {
      console.error(`Failed to write ${file}: ${e.message}`);
      stats.filesFailed++;
      stats.errors.push({ file, error: `Write failed: ${e.message}` });
    }
  }
}

async function scanAndFill() {
  const targetDir = path.resolve(argv.dir);
  const config = await loadConfig(targetDir);
  const accessKeys = resolveAccessKeys(config);
  const dryRun = argv["dry-run"];

  if (dryRun) {
    console.log("=== DRY-RUN MODE: No changes will be made ===\n");
  }

  if (accessKeys.length === 0) {
    console.error(
      "Error: At least one Unsplash Access Key is required. Provide via --keys/--key, UNSPLASH_ACCESS_KEYS/UNSPLASH_ACCESS_KEY, or unsplash.config.json (accessKeys/accessKey).",
    );
    process.exit(1);
  }

  const client = new UnsplashClient(accessKeys);

  console.log(`Scanning directory: ${targetDir}`);

  const files = await glob("**/*.{html,jsx,tsx}", {
    cwd: targetDir,
    ignore: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.git/**",
      "**/public/**",
    ],
  });

  console.log(`Found ${files.length} file(s).\n`);
  stats.filesScanned = files.length;

  // Process files sequentially to respect rate limits
  for (const file of files) {
    try {
      await processFile(file, targetDir, client, dryRun);
    } catch (e) {
      // Catch any unexpected errors to prevent entire process from failing
      console.error(`Unexpected error processing ${file}: ${e.message}`);
      stats.filesFailed++;
      stats.errors.push({ file, error: `Unexpected: ${e.message}` });
    }
  }

  // Print summary
  console.log("\n=== Summary ===");
  console.log(`Files scanned: ${stats.filesScanned}`);
  console.log(`Files modified: ${stats.filesModified}`);
  console.log(`Files skipped (already processed): ${stats.filesSkipped}`);
  console.log(`Files failed: ${stats.filesFailed}`);
  console.log(`Images hotlinked: ${stats.imagesHotlinked}`);

  if (stats.errors.length > 0) {
    console.log(`\nErrors (${stats.errors.length}):`);
    for (const err of stats.errors) {
      console.log(`  - ${err.file}: ${err.error}`);
    }
  }

  if (dryRun) {
    console.log("\n[DRY-RUN] No files were modified.");
  }
}

// Main entry point with top-level error handling
scanAndFill()
  .then(() => {
    const exitCode = stats.filesFailed > 0 ? 1 : 0;
    process.exit(exitCode);
  })
  .catch((err) => {
    console.error("Fatal error:", err.message);
    process.exit(1);
  });
