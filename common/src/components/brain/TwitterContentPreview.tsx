import BinIcon from "@/icons/BinIcon";
import ShareIcon from "@/icons/ShareIcon";
import TwitterIcon from "@/icons/TwitterIcon";
import Tags from "../ui/Tags";
import { getTitle } from "@/lib/getCustomData";

interface TwitterProps {
	content: string;
	author: string;
	authorHandle: string;
	timestamp: string;
	likes?: number;
	retweets?: number;
	replies?: number;
	tags: { $oid: { $oid: string } }[];
}

export function TwitterContentPreview({
	content,
	author,
	authorHandle,
	timestamp,
	likes = 0,
	retweets = 0,
	replies = 0,
	tags,
}: TwitterProps) {
	return (
		<div className="rounded-lg shadow-sm p-4 space-y-4 border border-gray-200 bg-white">
			{/* Twitter Post Header */}
			<div className="flex items-start gap-3">
				<div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
					<span className="text-white font-semibold text-lg">
						{author.charAt(0).toUpperCase()}
					</span>
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-semibold text-gray-900">{author}</span>
						<span className="text-gray-500">@{authorHandle}</span>
						<span className="text-gray-400">·</span>
						<span className="text-gray-500 text-sm">{timestamp}</span>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<ShareIcon />
					<BinIcon />
				</div>
			</div>

			{/* Tweet Content */}
			<div className="pl-15">
				<p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap">
					{content || "No content available"}
				</p>
			</div>

			{/* Twitter Stats */}
			<div className="pl-15 flex items-center gap-6 text-gray-500 text-sm">
				<div className="flex items-center gap-2">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
							clipRule="evenodd"
						/>
					</svg>
					<span>{replies}</span>
				</div>
				<div className="flex items-center gap-2">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
					<span>{retweets}</span>
				</div>
				<div className="flex items-center gap-2">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clipRule="evenodd"
						/>
					</svg>
					<span>{likes}</span>
				</div>
			</div>

			{/* Platform Indicator */}
			<div className="flex items-center gap-2 pt-2 border-t border-gray-100">
				<TwitterIcon />
				<span className="text-sm text-gray-500">Twitter Post</span>
			</div>

			{/* Tags */}
			<div className="flex flex-wrap gap-2 pt-3">
				{tags.map(async (data, index) => {
					const id = String(data.$oid.$oid);
					const tag = await getTitle(id);
					return <Tags key={index} text={tag} />;
				})}
			</div>
		</div>
	);
}
