"use client";
import React from "react";
import TwitterIcon from "@/icons/TwitterIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import HashTagIcon from "@/icons/HashTagIcon";
import MenuIcon from "@/icons/MenuIcon";
import AllContentIcon from "@/icons/AllContentIcon";
import MiniMenuIcon from "@/icons/MiniMenuIcons";
import SideComponent from "../ui/SideComponent";
import BrainIcon from "@/icons/BrainIcon";
import { slideStore } from "@/store/store";

export default function SiderBar() {
  const menuOpen = slideStore((state) => state.value);
  const handleMenu = slideStore((state) => state.toggle);
  // const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const siderBarComp = {
    maxiSideBar: [
      {
        text: "All Content",
        icon: <AllContentIcon />,
      },
      {
        text: "Twitter",
        icon: <TwitterIcon />,
      },
      {
        text: "Youtube",
        icon: <YoutubeIcon />,
      },
      {
        text: "Hash Tag",
        icon: <HashTagIcon />,
      },
    ],
    minSiderBar: [
      {
        icon: <AllContentIcon />,
      },
      {
        icon: <TwitterIcon />,
      },
      {
        icon: <YoutubeIcon />,
      },
      {
        icon: <HashTagIcon />,
      },
    ],
  };

  return (
    <div>
      {menuOpen === true ? (
        <div className="w-52 h-screen bg-white transition-all duration-500">
          <div className="flex justify-center pt-4 text-purple-500 gap-2">
            <BrainIcon />
            <h1 className="text-xl font-semibold"> SecondBrain </h1>
          </div>
          <div className="flex items-center gap-2 p-2">
            <button onClick={handleMenu}>
              <MenuIcon />
            </button>
            <div className="text-2xl font-bold text-center py-2 px-6">Menu</div>
          </div>
          <div>
            {siderBarComp.maxiSideBar.map((item, index) => (
              <SideComponent key={index} text={item.text} Icon={item.icon} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-14 h-screen bg-white transition-all duration-500">
          <div className="flex justify-center pt-4">
            <h1 className="text-purple-500 text-xl font-semibold">
              <BrainIcon />
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 px-2 pt-6">
            <button onClick={handleMenu}>
              <MiniMenuIcon />
            </button>
          </div>
          <div className="pt-6">
            {siderBarComp.minSiderBar.map((item, index) => (
              <SideComponent key={index} Icon={item.icon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
