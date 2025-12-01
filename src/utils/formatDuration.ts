/**
 * Formats a duration in seconds to a human-readable string (HH:MM:SS or MM:SS).
 * @param {number|string} seconds - The duration in seconds.
 * @returns {string} The formatted duration string.
 */
export const formatDuration = (seconds: number | string): string => {
    if (!seconds) return '00:00';

    const totalSeconds = parseInt(String(seconds), 10);
    if (isNaN(totalSeconds)) return '00:00';

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    if (hours > 0) {
        const formattedHours = String(hours).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    return `${formattedMinutes}:${formattedSeconds}`;
};
