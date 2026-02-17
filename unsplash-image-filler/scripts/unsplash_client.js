import fetch from "node-fetch";

// Note: fs, path, pipeline, sharp were removed as downloadImage() is deprecated
// This skill uses Unsplash CDN hotlinks only - no local image downloads

// Simple delay utility
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class UnsplashClient {
  constructor(accessKeys, options = {}) {
    const normalizedKeys = this._normalizeAccessKeys(accessKeys);
    if (normalizedKeys.length === 0) {
      throw new Error("At least one Unsplash access key is required.");
    }

    this.accessKeys = normalizedKeys;
    this.currentKeyIndex = Math.floor(Math.random() * this.accessKeys.length);
    this.baseUrl = "https://api.unsplash.com";

    // Rate limiting and retry configuration
    this.requestDelay = options.requestDelay ?? 200; // ms between requests
    this.maxRetries = options.maxRetries ?? 3;
    this.lastRequestTime = 0;

    // In-memory search cache (same query won't hit API twice)
    this.searchCache = new Map();

    console.log(
      `Using ${this.accessKeys.length} Unsplash API key(s). Random start index: ${this.currentKeyIndex + 1}/${this.accessKeys.length}`,
    );
  }

  _normalizeAccessKeys(accessKeys) {
    const raw = Array.isArray(accessKeys) ? accessKeys : [accessKeys];
    return [...new Set(raw.map((key) => String(key || "").trim()).filter(Boolean))];
  }

  _getCurrentAccessKey() {
    return this.accessKeys[this.currentKeyIndex];
  }

  _rotateToNextKey(reason = "") {
    if (this.accessKeys.length <= 1) return false;

    const previous = this.currentKeyIndex;
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.accessKeys.length;

    console.warn(
      `Switching Unsplash key ${previous + 1}/${this.accessKeys.length} -> ${this.currentKeyIndex + 1}/${this.accessKeys.length}${reason ? ` (${reason})` : ""}`,
    );
    return true;
  }

  _withAuthHeader(options = {}) {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Client-ID ${this._getCurrentAccessKey()}`,
    };
    return { ...options, headers };
  }

  async _isQuotaLimited(response) {
    if (response.status === 429) {
      return true;
    }

    if (response.status !== 401 && response.status !== 403) {
      return false;
    }

    const remaining = response.headers.get("x-ratelimit-remaining");
    if (remaining === "0") {
      return true;
    }

    const payload = await response
      .clone()
      .json()
      .catch(() => null);

    const messages = [
      payload?.error,
      ...(Array.isArray(payload?.errors) ? payload.errors : []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      messages.includes("rate limit") ||
      messages.includes("quota") ||
      messages.includes("limit exceeded")
    );
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
  async _fetchWithRetry(url, options = {}, retryCount = 0, keySwitchCount = 0) {
    await this._enforceRateLimit();

    try {
      const response = await fetch(url, this._withAuthHeader(options));

      // Handle rate limiting (429)
      const quotaLimited = await this._isQuotaLimited(response);
      if (quotaLimited) {
        if (keySwitchCount < this.accessKeys.length - 1) {
          this._rotateToNextKey("quota/rate limit");
          return this._fetchWithRetry(url, options, retryCount, keySwitchCount + 1);
        }

        if (retryCount >= this.maxRetries) {
          throw new Error(
            "Unsplash API quota/rate limit reached for all available keys. Please try again later.",
          );
        }

        const retryAfter = response.headers.get("retry-after");
        const waitTime = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : Math.pow(2, retryCount + 1) * 1000; // 2s, 4s, 8s

        console.log(
          `All keys limited. Waiting ${waitTime / 1000}s before retry ${retryCount + 1}/${this.maxRetries}...`,
        );
        await delay(waitTime);

        return this._fetchWithRetry(url, options, retryCount + 1, 0);
      }

      // Handle server errors with retry
      if (response.status >= 500 && retryCount < this.maxRetries) {
        const waitTime = Math.pow(2, retryCount + 1) * 1000;
        console.log(
          `Server error ${response.status}. Retrying in ${waitTime / 1000}s...`,
        );
        await delay(waitTime);

        return this._fetchWithRetry(url, options, retryCount + 1, keySwitchCount);
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

        return this._fetchWithRetry(url, options, retryCount + 1, keySwitchCount);
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
    const response = await this._fetchWithRetry(url);

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

  /**
   * @deprecated DO NOT USE - This method is deprecated and will throw an error.
   * Always use Unsplash CDN hotlinks (photo.urls.regular) instead of downloading images locally.
   * This skill is designed for hotlink-only usage to comply with Unsplash guidelines
   * and reduce bandwidth/storage overhead.
   */
  async downloadImage(url, destPath) {
    console.error(
      "⚠️  DEPRECATED: downloadImage() should NOT be used. Use Unsplash hotlinks instead.",
    );
    console.error(
      "   Use photo.urls.regular or photo.urls.small directly in your HTML/JSX src attribute.",
    );
    throw new Error(
      "downloadImage() is deprecated. This skill uses Unsplash CDN hotlinks only. " +
      "Use photo.urls.regular or photo.urls.small instead of downloading images locally.",
    );
  }

  async trackDownload(downloadLocation) {
    // Unsplash requires triggering a download event
    try {
      await this._fetchWithRetry(downloadLocation, {
        method: "GET",
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
