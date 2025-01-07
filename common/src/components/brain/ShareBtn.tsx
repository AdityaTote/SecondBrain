import ShareIcon from "@/icons/ShareIcon";
import { Button } from "../ui/Button";
import { BrainHeaderBtnCtx } from "@/contexts/BrainHeaderBtnContext";
import { useContext } from "react";

export default function ShareBtn() {
  const { setIsShareBtnClicked } = useContext(BrainHeaderBtnCtx);
  const handleShareToggle = () => {
    setIsShareBtnClicked(true);
  }
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
