
import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const RSS_URL = 'https://feed.podbean.com/satoshiyagafa/feed.xml';
const THUMBNAILS_DIR = path.join(process.cwd(), 'public', 'thumbnails');
const API_MODEL = process.env.NANO_BANANA_MODEL || 'gemini-2.5-flash-image';
const API_KEY = process.env.NANO_BANANA_API_KEY;

if (!API_KEY) {
    console.error("Error: NANO_BANANA_API_KEY is not set.");
    process.exit(1);
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const TEXT_API_MODEL = 'gemini-3.0-flash-preview';

async function fetchRSS() {
    console.log(`Fetching RSS from ${RSS_URL}...`);
    const response = await fetch(RSS_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }
    return response.text();
}

async function generatePrompt(title: string, description: string): Promise<string> {
    console.log(`Generating prompt for: "${title}"`);
    const instruction = `
You are an expert art director for a podcast.
Create a detailed, creative image generation prompt for a podcast episode.
Title: "${title}"
Description: "${description}"

The image should be:
- Suitable for a small thumbnail
- High quality and visually striking
- NO text in the image

Output ONLY the raw prompt string, no markdown, no quotes.
    `.trim();

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_API_MODEL}:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [{
            parts: [{ text: instruction }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            // Fallback to simpler model if 3.0 fails (e.g. 404)
            console.warn(`Gemini 3.0 failed (${response.status}), trying fallback model...`);
            const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`;
            const fallbackResponse = await fetch(fallbackUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!fallbackResponse.ok) {
                const errText = await fallbackResponse.text();
                throw new Error(`Text Generation API Error: ${errText}`);
            }
            const data = await fallbackResponse.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }

        const data = await response.json();
        const generatedPrompt = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedPrompt) {
            throw new Error("No prompt generated");
        }

        return generatedPrompt.trim();

    } catch (error) {
        console.error("Failed to generate prompt:", error);
        // Fallback to static prompt
        const cleanDescription = description.replace(/<[^>]*>?/gm, '').trim().substring(0, 200);
        return `Podcast thumbnail for episode titled "${title}". Description: ${cleanDescription}. High quality, abstract, artistic.`;
    }
}

async function generateImage(prompt: string, outputPath: string) {
    console.log(`Generating image for prompt: "${prompt}"`);

    // Use the generateContent endpoint for Gemini Image Generation (Nano Banana)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${API_MODEL}:generateContent?key=${API_KEY}`;

    // Construct the payload for Gemini API
    const payload = {
        contents: [{
            parts: [
                { text: prompt }
            ]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Error (${response.status}): ${errText}`);
        }

        const data = await response.json();

        // Parse response - checking for inlineData
        // { candidates: [ { content: { parts: [ { inlineData: { mimeType: "image/png", data: "..." } } ] } } ] }

        let base64Image: string | null = null;

        if (data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0];
            if (candidate.content && candidate.content.parts) {
                for (const part of candidate.content.parts) {
                    if (part.inlineData && part.inlineData.data) {
                        base64Image = part.inlineData.data;
                        break;
                    }
                }
            }
        }

        if (!base64Image) {
            // Fallback or error logging
            console.error("Unexpected API response structure:", JSON.stringify(data, null, 2));
            throw new Error("No image data found in response");
        }

        const buffer = Buffer.from(base64Image, 'base64');
        fs.writeFileSync(outputPath, buffer);
        console.log(`Saved thumbnail to ${outputPath}`);

    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to generate image: ${error.message}`);
        } else {
            console.error(`Failed to generate image: ${error}`);
        }
        throw error;
    }
}

async function main() {
    try {
        const xmlData = await fetchRSS();
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });
        const result = parser.parse(xmlData);

        const items = result.rss?.channel?.item;

        if (!items || !Array.isArray(items)) {
            console.log("No items found in RSS feed.");
            return;
        }

        // Ensure thumbnails directory exists
        if (!fs.existsSync(THUMBNAILS_DIR)) {
            fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
        }

        for (const item of items) {
            const title = item.title;
            const description = item.description; // Usually HTML

            // Match EP or Special
            const match = title.match(/\[(EP|Special-)(\d+)\]/);
            if (!match) continue;

            const type = match[1] === 'EP' ? 'ep' : 'special-';
            const number = match[2];
            const filename = `${type}${number}.png`;
            const filePath = path.join(THUMBNAILS_DIR, filename);

            if (fs.existsSync(filePath)) {
                console.log(`Thumbnail exists for ${title} (${filename}), skipping.`);
                continue;
            }

            console.log(`Thumbnail missing for ${title}, generating...`);

            // Use Gemini to generate the prompt
            // Clean description slightly for the text model input
            const cleanDescription = description.replace(/<[^>]*>?/gm, '').trim();
            const prompt = await generatePrompt(title, cleanDescription);

            await generateImage(prompt, filePath);

            // Sleep to avoid rate limits
            await sleep(5000);
        }

    } catch (error) {
        console.error("Script execution failed:", error);
        process.exit(1);
    }
}

main();
