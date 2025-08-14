import { TwitterContentPreview } from "@/components/brain/TwitterContentPreview";
import { YoutubeContentPreview } from "@/components/brain/YoutubeContentPreview";
import { getBrainContentById } from "@/lib/fetchData";
import { getUser } from "@/lib/getCustomData";
import { getYouTubeVideoID } from "@/lib/yt";
import { BrainContent } from "@/types/types";

async function getBrainContent(brainId: string): Promise<{
	error: boolean;
	data: BrainContent | null;
	message: string;
}> {
	const user = await getUser();
	const token = user?.token || "";
	const { error, data, message } = await getBrainContentById(brainId, token);
	return { error, data, message };
}

export default async function BrainContentPreview({
	params,
}: {
	params: Promise<{ brainId: string }>;
}) {
	const brainId = (await params).brainId;
	const { error, data, message } = await getBrainContent(brainId);

	if (error === true && data === null) {
		return (
			<div className="pl-14 pt-6 flex">
				<h1>{message}</h1>
			</div>
		);
	}

	if (error === false && data !== null) {
		if (data.types === "youtube") {
			const videoId = getYouTubeVideoID(data.link);
			if (videoId === null) {
				return (
					<div className="pl-14 pt-6 flex">
						<h1>Invalid YouTube URL</h1>
					</div>
				);
			}

			return (
				<YoutubeContentPreview
					videoId={videoId}
					title={data.title}
					description={data.description}
					tags={data.tags}
				/>
			);
		} else if (data.types === "twitter") {
			return (
				<TwitterContentPreview
					content={data.description}
					author={data.title}
					authorHandle={data.title}
					timestamp={data.title}
					tags={data.tags}
				/>
			);
		} else {
			// Handle unknown content types
			return (
				<div className="pl-14 pt-6 flex">
					<h1>Unsupported content type: {data.types}</h1>
				</div>
			);
		}
	}

	// Fallback return for unexpected cases
	return (
		<div className="pl-14 pt-6 flex">
			<h1>Unable to load content</h1>
		</div>
	);
}
