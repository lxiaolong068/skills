import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import sharp from "sharp";

// Simple delay utility
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class UnsplashClient {
  constructor(accessKey, options = {}) {
    this.accessKey = accessKey;
    this.baseUrl = "https://api.unsplash.com";

    // Rate limiting and retry configuration
    this.requestDelay = options.requestDelay ?? 200; // ms between requests
    this.maxRetries = options.maxRetries ?? 3;
    this.lastRequestTime = 0;

    // In-memory search cache (same query won't hit API twice)
    this.searchCache = new Map();
  }

  /**
   * Enforce rate limiting by waiting if needed
   */
  async _enforceRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.requestDelay) {
      await delay(this.requestDelay - timeSinceLastRequest);
    }

    this.lastRequestTime = Date.now();
  }

  /**
   * Execute request with retry logic and exponential backoff
   */
  async _fetchWithRetry(url, options, retryCount = 0) {
    await this._enforceRateLimit();

    try {
      const response = await fetch(url, options);

      // Handle rate limiting (429)
      if (response.status === 429) {
        if (retryCount >= this.maxRetries) {
          throw new Error(
            "Unsplash API rate limit exceeded. Please try again later.",
          );
        }

        // Get retry-after header or use exponential backoff
        const retryAfter = response.headers.get("retry-after");
        const waitTime = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : Math.pow(2, retryCount + 1) * 1000; // 2s, 4s, 8s

        console.log(
          `Rate limited. Waiting ${waitTime / 1000}s before retry ${retryCount + 1}/${this.maxRetries}...`,
        );
        await delay(waitTime);

        return this._fetchWithRetry(url, options, retryCount + 1);
      }

      // Handle server errors with retry
      if (response.status >= 500 && retryCount < this.maxRetries) {
        const waitTime = Math.pow(2, retryCount + 1) * 1000;
        console.log(
          `Server error ${response.status}. Retrying in ${waitTime / 1000}s...`,
        );
        await delay(waitTime);

        return this._fetchWithRetry(url, options, retryCount + 1);
      }

      return response;
    } catch (error) {
      // Network errors - retry with backoff
      if (
        retryCount < this.maxRetries &&
        error.code &&
        ["ECONNRESET", "ETIMEDOUT", "ENOTFOUND"].includes(error.code)
      ) {
        const waitTime = Math.pow(2, retryCount + 1) * 1000;
        console.log(
          `Network error: ${error.code}. Retrying in ${waitTime / 1000}s...`,
        );
        await delay(waitTime);

        return this._fetchWithRetry(url, options, retryCount + 1);
      }

      throw error;
    }
  }

  async searchPhotos(query, perPage = 1) {
    // Check cache first
    const cacheKey = `${query}:${perPage}`;
    if (this.searchCache.has(cacheKey)) {
      return this.searchCache.get(cacheKey);
    }

    const url = `${this.baseUrl}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
    const response = await this._fetchWithRetry(url, {
      headers: {
        Authorization: `Client-ID ${this.accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Unsplash API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    const results = data.results;

    // Cache the results
    this.searchCache.set(cacheKey, results);

    return results;
  }

  async downloadImage(url, destPath) {
    const response = await this._fetchWithRetry(url, {});

    if (!response.ok) {
      throw new Error(
        `Failed to download image: ${response.status} ${response.statusText}`,
      );
    }

    await fs.promises.mkdir(path.dirname(destPath), { recursive: true });

    // Create a sharp pipeline
    const transformer = sharp()
      .resize(1920, null, {
        // Max width 1920, auto height
        withoutEnlargement: true, // Don't scale up smaller images
        fit: "inside",
      })
      .jpeg({ quality: 80, mozjpeg: true }); // Optimize JPEG

    await pipeline(response.body, transformer, fs.createWriteStream(destPath));
  }

  async trackDownload(downloadLocation) {
    // Unsplash requires triggering a download event
    try {
      await this._fetchWithRetry(downloadLocation, {
        headers: {
          Authorization: `Client-ID ${this.accessKey}`,
        },
      });
    } catch (e) {
      console.warn("Failed to track download:", e.message);
    }
  }

  /**
   * Clear the search cache (useful for long-running processes)
   */
  clearCache() {
    this.searchCache.clear();
  }
}
