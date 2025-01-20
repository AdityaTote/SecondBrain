"use client";
import { addBtnStore, shareBtnStore } from "@/store/store";
import { UserType } from "@/types/types";
import BrainHeader from "./BrainHeader";
import SearchBox from "./SearchBox";
import CloseIcon from "@/icons/CloseIcon";
import AddContentModal from "./AddContentModal";

interface BrainHeaderCompProp {
    user: UserType;
}

export default function BrainHeaderComp({ user }: BrainHeaderCompProp) {
  const isAddContentBtnClicked = addBtnStore((state) => state.value);
  const isShareBtnClicked = shareBtnStore((state) => state.value);
  const handleAddBtnClose = addBtnStore((state) => state.close);
  const handleShareBtnClose = shareBtnStore((state) => state.close);
  return (
    <>
      <SearchBox />
      <BrainHeader username={user?.username ?? "No One"} />

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
            <AddContentModal user={user} />
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
          </div>
        </div>
      )}
    </>
  );
}