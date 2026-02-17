---
name: unsplash-image-filler
description: Scans web projects, analyzes page context with NLP, and inserts Unsplash hotlink URLs directly into HTML/JSX. NEVER downloads images locally - always uses Unsplash CDN hotlinks.
---

# Unsplash Image Filler

This skill automatically populates your website with relevant images from Unsplash using **hotlink URLs only**.

> [!IMPORTANT]
> **ALWAYS USE HOTLINKS - NEVER DOWNLOAD IMAGES LOCALLY**
>
> This skill is designed to use Unsplash CDN hotlinks (`images.unsplash.com`) directly in the `src` attribute. 
> **DO NOT** download images to local directories. **DO NOT** save images to `public/`, `assets/`, or any local folder.
> The `imageDestination` config option is deprecated and should be ignored.

## How It Works

1. Scans HTML/JSX files for placeholder tags
2. Analyzes page content using NLP to determine relevant keywords
3. Searches Unsplash API for matching images
4. **Inserts the Unsplash CDN URL directly into the `src` attribute** (e.g., `https://images.unsplash.com/photo-xxx?w=1080`)
5. Tracks downloads per Unsplash API guidelines

## Usage

### 1. Configuration

Set your Unsplash Access Key(s) via environment variable (recommended):
```bash
export UNSPLASH_ACCESS_KEY="your_key_here"
# or multiple keys (comma-separated)
export UNSPLASH_ACCESS_KEYS="key_1,key_2,key_3"
```

Or create `unsplash.config.json` in your project root:
```json
{
  "accessKeys": ["KEY_1", "KEY_2", "KEY_3"]
}
```

Backward-compatible single key is still supported:
```json
{
  "accessKey": "YOUR_UNSPLASH_ACCESS_KEY"
}
```

### 2. Add Placeholders

Add image tags to your HTML or JSX files:

| Placeholder | Description |
|-------------|-------------|
| `<img data-unsplash-auto />` | Auto-match based on page content |
| `<img data-unsplash-search="mountain landscape" />` | Specific search term |

For articles (HTML only):
```html
<article data-unsplash-article="sections">
  <!-- inserts after each heading section -->
</article>
<article data-unsplash-article="paragraphs">
  <!-- inserts after each paragraph -->
</article>
<article data-unsplash-article="auto">
  <!-- smart density: headings if present, otherwise paragraphs -->
</article>
```

### 3. Run the Script

```bash
node scripts/auto_fill.js --dir /path/to/your/project
```

Options:
- `--dir, -d`: Target directory to scan (default: `.`)
- `--key, -k`: Unsplash Access Key (single key, backward-compatible)
- `--keys`: Comma-separated Unsplash Access Keys (key pool)
- `--dry-run`: Preview operations without making changes

## Output Example

Before:
```html
<img data-unsplash-search="coffee shop" />
```

After:
```html
<img data-unsplash-processed="true" data-unsplash-id="abc123" src="https://images.unsplash.com/photo-xxx?w=1080" data-unsplash-search="coffee shop" />
```

> [!NOTE]
> The script adds `data-unsplash-processed="true"` to prevent re-processing on subsequent runs.

## Features

- **Semantic Analysis**: NLP-powered content analysis for auto-matching
- **Hotlink Only**: Uses Unsplash CDN URLs directly (no local downloads)
- **Smart Caching**: In-memory cache prevents redundant API calls
- **Rate Limiting**: Built-in retry logic and exponential backoff
- **Key Rotation**: Randomly starts with one key and rotates to the next key when quota/rate limit is hit
- **Idempotent**: Safe to run multiple times (skips processed images)

## Requirements

- Node.js
- Run `npm install` in the `scripts` directory

## Agent Instructions

> [!CAUTION]
> **FOR AI AGENTS**: When using this skill:
> 1. **NEVER** use the `downloadImage()` method from `unsplash_client.js`
> 2. **ALWAYS** use the hotlink URL from `photo.urls.regular` or `photo.urls.small`
> 3. **NEVER** save images to local filesystem
> 4. **ONLY** run `auto_fill.js` script which handles everything correctly
> 5. If manually inserting images, use format: `<img src="https://images.unsplash.com/photo-xxx?w=1080" />`
