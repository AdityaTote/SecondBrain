"use client";
import PlusIcon from "@/icons/PlusIcon";
import { Button } from "../ui/Button";
import { addBtnStore } from "@/store/store";


export default function AddContentBtn() {
  const handleAddContentToggle = addBtnStore((state) => state.toggle)  
  return (
    <Button
      variant={"default"}
      className="flex justify-center items-center gap-2 text-gray-100"
      onClick={handleAddContentToggle}
    >
      <PlusIcon /> Add Content
    </Button>
  );
}
