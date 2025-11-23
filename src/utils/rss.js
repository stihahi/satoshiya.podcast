export const fetchEpisodes = async () => {
    const RSS_URL = 'https://feed.podbean.com/satoshiyagafa/feed.xml';

    try {
        const response = await fetch(RSS_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const channelTitle = xml.querySelector("channel > title")?.textContent || "Podcast";

        const items = xml.querySelectorAll("item");
        const episodes = Array.from(items).map((item, index) => {
            const title = item.querySelector("title")?.textContent || "No Title";
            const description = item.querySelector("description")?.textContent || "No Description";
            const pubDate = item.querySelector("pubDate")?.textContent;

            // Handle namespaced elements
            const duration = item.getElementsByTagName("itunes:duration")[0]?.textContent || "";
            const image = item.getElementsByTagName("itunes:image")[0]?.getAttribute("href") ||
                xml.querySelector("image > url")?.textContent || // Fallback to channel image
                "https://picsum.photos/300/200"; // Fallback placeholder

            const enclosure = item.querySelector("enclosure");
            const audioUrl = enclosure?.getAttribute("url");

            // Format date
            const date = pubDate ? new Date(pubDate).toLocaleDateString("en-US", {
                year: 'numeric', month: 'short', day: 'numeric'
            }) : "";

            return {
                id: index, // Use index as ID for now, or could use guid
                title,
                description: description.replace(/<[^>]*>?/gm, ''), // Strip HTML from description
                date,
                duration,
                image,
                audioUrl
            };
        });

        return { title: channelTitle, episodes };
    } catch (error) {
        console.error("Error fetching episodes:", error);
        throw error;
    }
};
