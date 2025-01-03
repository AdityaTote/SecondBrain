import { fetchBrain } from "@/lib/fetchBrain"
import ContentCard from "./ContentCard"
import SiderBar from "./SiderBar"
import { BrainContent, SessionType } from "@/types/types"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const getBrain = async () => {
  const session: SessionType = await getServerSession(authOptions);
  const userId = session?.user.id || ""; 
  console.log(userId)
  const data: BrainContent[] = await fetchBrain({userId: userId});
  console.log(data)
  return data
}

export default async function Brain() {
  const data = await getBrain();
  // console.log(data)
  
    return(
        <div className="bg-gray-100 h-screen w-screen">
        <div className="fixed top-0 left-0">
          <SiderBar />
        </div>
        <div className="pl-14 pt-6 flex">
        {data && data.length > 0 ? (
          data.map((content: BrainContent) => {
            // Extract and format the _id safely
            const contentId = content._id?.$oid.toString() || content._id.toString();

            // Ensure tags are passed as an array
            const userId = content.user_id.$oid.toString();
            const tags = Array.isArray(content.tags) ? content.tags : [];
            const createdAt = content.created_at["$date"].toString();
            const updatedAt = content.updated_at["$date"].toString();


            return   (
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
    )
}