"use client";
import ShareBtn from "./ShareBtn";
import AddContentBtn from "./AddContentBtn";

export default function BrainHeader({ username }: { username: string }) {
  return (
    <div className="pl-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold ">
        Welcome, <span className="text-purple-500">{username}</span> to your{" "}
        <span className="text-purple-500">SecondBrain</span>
      </h1>
      <div className="flex gap-4 p-4">
        <ShareBtn  />
        <AddContentBtn />
      </div>
    </div>
  );
}