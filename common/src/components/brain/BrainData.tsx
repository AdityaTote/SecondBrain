"use client";
import { BrainContent, UserType } from "@/types/types";
import BrainHeader from "./BrainHeader";
import ContentCard from "./ContentCard";
import SiderBar from "./SiderBar";
import SearchBox from "./SearchBox";
import { addBtnStore, shareBtnStore } from "@/store/store";

interface BrainDataProp {
  data: BrainContent[];
  user: UserType;
}

export default function BrainData({ data, user }: BrainDataProp) {

  const isAddContentBtnClicked = addBtnStore((state) => state.value);
  const isShareBtnClicked = shareBtnStore((state) => state.value);

  return (
      <div className={`flex h-screen`}>
        <SiderBar />
        <div className="flex-1 bg-gray-100">
          <div className="pt-4 w-full">
            <SearchBox />
            <BrainHeader username={user?.username ?? "No One"} />
            <div className="flex">
              {isAddContentBtnClicked && <div>Hi</div>}
              {isShareBtnClicked && (
                <div className="w-1/2 h-screen bg-gray-200 fixed top-0 right-0 z-50">
                  Share Brain
                </div>
              )}
              {data && data.length > 0 ? (
                data.map((content: BrainContent) => (
                  <ContentCard
                    key={content._id?.$oid || content._id.toString() || ""}
                    id={content._id?.$oid || content._id.toString() || ""}
                    title={content.title || "Untitled"}
                    link={content.link}
                    tags={Array.isArray(content.tags) ? content.tags : []}
                    type={content.types}
                    date={content.created_at["$date"].toString()}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-full">
                  <h1>No Content</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
