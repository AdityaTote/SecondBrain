"use client";
import { BrainContent, UserType } from "@/types/types";
import BrainHeader from "./BrainHeader";
import ContentCard from "./ContentCard";
import SiderBar from "./SiderBar";
import BrainHeaderBtnContext, { BrainHeaderBtnCtx } from "@/contexts/BrainHeaderBtnContext";
import { useContext } from "react";

interface BrainDataProp {
  data: BrainContent[];
  user: UserType;
}

export default function BrainData({ data, user }: BrainDataProp) {
    const { isAddContentBtnClicked, isShareBtnClicked} = useContext(BrainHeaderBtnCtx);
  return (
    <BrainHeaderBtnContext>
      <div className="bg-gray-100 h-full w-full">
        <div className="fixed top-0 left-0">
          <SiderBar />
        </div>
        <div className="pl-14 pt-4">
          <BrainHeader username={user?.username ?? "No One"} />
          <div className="flex">
            {isAddContentBtnClicked === true && <div className="w-1/2 h-screen bg-gray-200 fixed top-0 right-0 z-50">Add Content</div>}
            {isShareBtnClicked === true && <div className="w-1/2 h-screen bg-gray-200 fixed top-0 right-0 z-50">Share Brain</div>}
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
              <div className="w-screen h-screen flex justify-center items-center">
                <h1>No Content</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </BrainHeaderBtnContext>
  );
}
