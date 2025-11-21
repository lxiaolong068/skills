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
      "accessKey": "YOUR_UNSPLASH_ACCESS_KEY",
      "imageDestination": "public/images/unsplash"
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

3.  **Run**: Execute the script to scan and fill images.
    ```bash
    node scripts/auto_fill.js --dir /path/to/your/project
    ```

## Features

*   **Semantic Analysis**: Uses NLP to analyze page content (titles, headers, paragraphs) and automatically select relevant images for `data-unsplash-auto` placeholders.
*   **Direct Insertion**: Automatically updates your HTML/JSX files with the correct `src` path to the downloaded image.
*   **Smart Caching**: Checks if an image already exists to avoid redundant downloads.
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
