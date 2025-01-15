"use client";
import { BrainContent, UserType } from "@/types/types";
import BrainHeader from "./BrainHeader";
import ContentCard from "./ContentCard";
import SiderBar from "./SiderBar";
import SearchBox from "./SearchBox";
import { addBtnStore, shareBtnStore } from "@/store/store";
import CloseIcon from "@/icons/CloseIcon";
import AddContentModal from "./AddContentModal";

interface BrainDataProp {
  data: BrainContent[];
  user: UserType;
}

export default function BrainData({ data, user }: BrainDataProp) {
  const isAddContentBtnClicked = addBtnStore((state) => state.value);
  const isShareBtnClicked = shareBtnStore((state) => state.value);
  const handleAddBtnClose = addBtnStore((state) => state.close);
  const handleShareBtnClose = shareBtnStore((state) => state.close);

  return (
    <div className="flex h-screen">
      <SiderBar />
      <div className="flex-1 bg-gray-100">
        <div className="p-4 w-full">
          <SearchBox />
          <BrainHeader username={user?.username ?? "No One"} />

          {/* Modals */}
          {isAddContentBtnClicked && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="w-1/3 max-w-2xl bg-white rounded-lg shadow-lg p-6 relative">
                <div className="flex items-end">
                  <button
                    onClick={handleAddBtnClose}
                    className="absolute top-4 right-4 hover:bg-gray-100 p-1 rounded"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <AddContentModal user={user}  />
              </div>
            </div>
          )}

          {isShareBtnClicked && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="w-96 bg-white rounded-lg shadow-lg p-6 relative">
                <button
                  onClick={handleShareBtnClose}
                  className="absolute top-4 right-4 hover:bg-gray-100 p-1 rounded"
                >
                  <CloseIcon />
                </button>
                {/* Share content form goes here */}
              </div>
            </div>
          )}

          {/* Content Cards */}
          <div className="mt-6">
            {data && data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {data.map((content: BrainContent) => (
                  <ContentCard
                    key={content._id?.$oid || content._id.toString() || ""}
                    id={content._id?.$oid || content._id.toString() || ""}
                    title={content.title || "Untitled"}
                    link={content.link}
                    tags={Array.isArray(content.tags) ? content.tags : []}
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
      </div>
    </div>
  );
}
