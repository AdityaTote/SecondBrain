import { TwitterContentPreview } from "./TwitterContentPreview";

export function TwitterPreviewExample() {
	// Sample Twitter post data
	const sampleTweet = {
		tweetId: "1234567890",
		content:
			"Just launched our new AI-powered content management system! 🚀\n\nExcited to see how it helps teams collaborate and organize their knowledge better. The future of productivity is here! 💡\n\n#AI #Productivity #Innovation",
		author: "TechCorp",
		authorHandle: "techcorp_official",
		timestamp: "2h",
		likes: 42,
		retweets: 12,
		replies: 8,
		tags: [
			{ $oid: { $oid: "507f1f77bcf86cd799439011" } },
			{ $oid: { $oid: "507f1f77bcf86cd799439012" } },
			{ $oid: { $oid: "507f1f77bcf86cd799439013" } },
		],
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h2 className="text-2xl font-bold text-gray-900 mb-6">
				Twitter Post Preview Example
			</h2>
			<TwitterContentPreview {...sampleTweet} />
		</div>
	);
}
