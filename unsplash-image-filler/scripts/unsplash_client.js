import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

export class UnsplashClient {
    constructor(accessKey) {
        this.accessKey = accessKey;
        this.baseUrl = 'https://api.unsplash.com';
    }

    async searchPhotos(query, perPage = 1) {
        const url = `${this.baseUrl}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${this.accessKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.results;
    }

    async downloadImage(url, destPath) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
        }

        await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
        await pipeline(response.body, fs.createWriteStream(destPath));
    }

    async trackDownload(downloadLocation) {
        // Unsplash requires triggering a download event
        try {
            await fetch(downloadLocation, {
                headers: {
                    'Authorization': `Client-ID ${this.accessKey}`
                }
            });
        } catch (e) {
            console.warn("Failed to track download", e);
        }
    }
}
