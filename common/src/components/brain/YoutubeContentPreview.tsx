import BinIcon from "@/icons/BinIcon";
import ShareIcon from "@/icons/ShareIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import Tags from "../ui/Tags";
import { getTitle } from "@/lib/getCustomData";

interface YoutubeProps {
	videoId: string;
	title: string;
	description: string;
	tags: { $oid: { $oid: string } }[];
}

export function YoutubeContentPreview({
	videoId,
	title,
	description,
	tags,
}: YoutubeProps) {
	return (
		<div className="rounded-lg shadow-sm p-4 space-y-4">
			<div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
				<iframe
					width="100%"
					height="100%"
					src={`https://www.youtube.com/embed/${videoId}`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="w-full h-full"
				/>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<YoutubeIcon />
					<div>
						<h1 className="font-medium text-gray-900 line-clamp-1">{title}</h1>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<ShareIcon />
					<BinIcon />
				</div>
			</div>
			<p className="text-sm text-gray-600 line-clamp-2">
				{description || "No Description"}
			</p>
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
