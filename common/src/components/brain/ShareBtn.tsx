"use client";
import ShareIcon from "@/icons/ShareIcon";
import { Button } from "../ui/Button";
import { shareBtnStore } from "@/store/store";

export default function ShareBtn() {
    const handleShareToggle = shareBtnStore((state) => state.toggle)  
  
  return (
    <Button
      variant={"secondary"}
      className="flex justify-center items-center gap-2 text-purple-500"
      onClick={handleShareToggle}
    >
      <ShareIcon /> Share Brain
    </Button>
  );
}
