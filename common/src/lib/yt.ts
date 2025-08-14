export function getYouTubeVideoID(url: string): string | null {
	// Handle null/undefined/empty URLs
	if (!url || typeof url !== "string") {
		return null;
	}

	// Support multiple YouTube URL formats
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([\w-]{11})/,
		/youtube\.com\/watch\?.*v=([\w-]{11})/,
		/youtu\.be\/([\w-]{11})/,
	];

	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match && match[1]) {
			return match[1];
		}
	}

	return null;
}
