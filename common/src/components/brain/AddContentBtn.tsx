import PlusIcon from "@/icons/PlusIcon";
import { Button } from "../ui/Button";
import { BrainHeaderBtnCtx } from "@/contexts/BrainHeaderBtnContext";
import { useContext } from "react";

export default function AddContentBtn() {
    const { setIsAddContentBtnClicked } = useContext(BrainHeaderBtnCtx);
    const handleAddContentToggle = () => {
        setIsAddContentBtnClicked(true);
    }
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
