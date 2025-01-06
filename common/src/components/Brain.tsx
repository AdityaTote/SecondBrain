import { fetchBrain } from "@/lib/fetchData";
import ContentCard from "./ContentCard";
import SiderBar from "./SiderBar";
import { BrainContent, SessionType } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const getBrain = async () => {
  const session: SessionType = await getServerSession(authOptions);
  const token = session?.user.token || "";
  const {
    error,
    message,
    data,
  }: {
    error: boolean;
    message: string;
    data: BrainContent[];
  } = await fetchBrain({ token: token });
  return { error, message, data };
};

export default async function Brain() {
  const { error, message, data } = await getBrain();

  if (error === true && data === null) {
    return (
      <div className="bg-gray-100 h-screen w-screen">
        <div className="fixed top-0 left-0">
          <SiderBar />
        </div>
        <div className="pl-14 pt-6 flex">
          <h1>{message}</h1>
        </div>
      </div>
    );
  }

  if (error === false && data !== null) {
    return (
      <div className="bg-gray-100 h-screen w-screpageen">
        <div className="fixed top-0 left-0">
          <SiderBar />
        </div>
        <div className="pl-14 pt-6 flex">
          {data && data.length > 0 ? (
            data.map((content: BrainContent) => {
              const contentId =
                content._id?.$oid.toString() || content._id.toString();

              const tags = Array.isArray(content.tags) ? content.tags : [];
              const createdAt = content.created_at["$date"].toString();

              return (
                <ContentCard
                  key={contentId || ""}
                  id={contentId || ""}
                  title={content.title || "Untitled"}
                  link={content.link}
                  tags={tags}
                  type={content.types}
                  date={createdAt}
                />
              );
            })
          ) : (
            <h1>No data</h1>
          )}
        </div>
      </div>
    );
  }
}
