---
name: unsplash-image-filler
description: Scans the current web project, analyzes pages for context, and downloads appropriate free images from Unsplash to supplement the content.
---

# Unsplash Image Filler

This skill helps you automatically populate your website with relevant images from Unsplash.

## Usage

1.  **Configuration (Optional)**: Create a `unsplash.config.json` in your project root.
    ```json
    {
      "accessKey": "YOUR_UNSPLASH_ACCESS_KEY"
    }
    ```
    Alternatively, you can set the `UNSPLASH_ACCESS_KEY` environment variable.

2.  **Add Placeholders**: Add image tags to your HTML or JSX files where you want images to appear.
    *   **Auto-match based on content**:
        ```html
        <img data-unsplash-auto />
        ```
    *   **Specific search term**:
        ```html
        <img data-unsplash-search="mountain landscape" />
        ```
    *   **Auto-insert within an article** (HTML only):
        ```html
        <article data-unsplash-article="sections">
          <!-- inserts after each heading section -->
        </article>
        <article data-unsplash-article="paragraphs">
          <!-- inserts after each paragraph -->
        </article>
        <article data-unsplash-article="auto">
          <!-- headings if present, otherwise paragraphs with smart density -->
        </article>
        ```

3.  **Run**: Execute the script to scan and fill images.
    ```bash
    node scripts/auto_fill.js --dir /path/to/your/project
    ```

## Features

*   **Semantic Analysis**: Uses NLP to analyze page content (titles, headers, paragraphs) and automatically select relevant images for `data-unsplash-auto` placeholders.
*   **Direct Insertion**: Automatically updates your HTML/JSX files with the Unsplash hotlink URL as `src`.
*   **Smart Caching**: Uses an in-memory search cache to avoid redundant API searches.
*   **Configurable**: Customize destination paths and API keys via a config file.

## Scripts

-   `scripts/auto_fill.js`: The main script.

## Requirements

-   Node.js
-   `npm install` in the `scripts` directory.

## Example

```bash
export UNSPLASH_ACCESS_KEY="your_key_here"
node scripts/auto_fill.js --dir /path/to/your/project
```

See `unsplash-image-filler/examples/blog_smart_density.html` for a longform
article example that uses `data-unsplash-article="auto"` with smart density.
