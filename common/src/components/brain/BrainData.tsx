import { BrainContent, UserType } from "@/types/types";
import ContentCard from "./ContentCard";
import BrainHeaderComp from "./BrainHeaderComp";

interface BrainDataProp {
	data: BrainContent[];
	user: UserType;
}

export default function BrainData({ data, user }: BrainDataProp) {
	return (
		<div className="p-2 w-full">
			<BrainHeaderComp user={user} />
			<div className="mt-4 w-full">
				{data && data.length > 0 ? (
					<div className="grid grid-cols-1 justify-evenly sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
						{data.map((content: BrainContent) => (
							<div
								key={content._id?.$oid || content._id.toString() || ""}
								className="w-full"
							>
								<ContentCard
									id={content._id?.$oid || content._id.toString() || ""}
									user={user}
									title={content.title || "Untitled"}
									description={content.description || "No Description"}
									tags={
										Array.isArray(content.tags)
											? content.tags.map((tag) => ({ $oid: tag }))
											: []
									}
									date={content.created_at["$date"].toString()}
								/>
							</div>
						))}
					</div>
				) : (
					<div className="flex justify-center items-center min-h-[400px]">
						<div className="text-center">
							<h1 className="text-gray-500 text-xl mb-2">No Content</h1>
							<p className="text-gray-400 text-sm">
								Start by adding some content to your brain!
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
