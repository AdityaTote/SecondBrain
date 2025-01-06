import ShareIcon from "@/icons/ShareIcon";
import { Button } from "./ui/Button";
import PlusIcon from "@/icons/PlusIcon";

export default function BrainHeader({username}: {username: string}) {
  return (
    <div className="pl-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold ">
        Welcome,<span className="text-purple-500">{username}</span> to
        your <span className="text-purple-500">SecondBrain</span>
      </h1>
      <div className="flex gap-4 p-4">
        <div>
          <Button
            variant={"secondary"}
            className="flex justify-center items-center gap-2 text-purple-500"
          >
            <ShareIcon /> Share Brain
          </Button>
        </div>
        <div>
          <Button
            variant={"default"}
            className="flex justify-center items-center gap-2 text-gray-100"
          >
            <PlusIcon /> Add Content
          </Button>
        </div>
      </div>
    </div>
  );
}
