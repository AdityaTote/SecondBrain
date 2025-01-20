import { BrainContent, UserType } from "@/types/types";
import ContentCard from "./ContentCard";
import BrainHeaderComp from "./BrainHeaderComp";

interface BrainDataProp {
  data: BrainContent[];
  user: UserType;
}

export default function BrainData({ data, user }: BrainDataProp) {
  return (
    <>
      <div className="p-4 w-full grid  ">
        <BrainHeaderComp user={user} />

        {/* Content Cards */}
        <div className="mt-6">
          {data && data.length > 0 ? (
            <div className="grid items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {data.map((content: BrainContent) => (
                <ContentCard
                  key={content._id?.$oid || content._id.toString() || ""}
                  id={content._id?.$oid || content._id.toString() || ""}
                  title={content.title || "Untitled"}
                  link={content.link}
                  tags={
                    Array.isArray(content.tags)
                      ? content.tags.map((tag) => ({ $oid: tag }))
                      : []
                  }
                  type={content.types}
                  date={content.created_at["$date"].toString()}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
              <h1 className="text-gray-500 text-xl">No Content</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
