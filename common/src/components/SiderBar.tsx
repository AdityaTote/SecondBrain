"use client";
import TwitterIcon from "@/icons/TwitterIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import HashTagIcon from "@/icons/HashTagIcon";
import MenuIcon from "@/icons/MenuIcon";
import { useState } from "react";
import AllContentIcon from "@/icons/AllContentIcon";
import MiniMenuIcon from "@/icons/MiniMenuIcons";
import SideComponent from "./ui/SideComponent";
import MiniSideBarComponent from "./ui/MiniSideBarComponent";

export default function SiderBar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {menuOpen ? (
        <div className="w-64 h-screen bg-white transition-all duration-500">
          <div className="flex items-center gap-2 p-2">
            <button onClick={handleMenu}>
              <MenuIcon />
            </button>
            <div className="text-2xl font-bold text-center p-4">Menu</div>
          </div>
          <div>
            <SideComponent text="All Content" Icon={<AllContentIcon/>} />
            <SideComponent text="Twitter" Icon={<TwitterIcon/>} />
            <SideComponent text="Youtube" Icon={<YoutubeIcon/>} />
            <SideComponent text="Hast Tag" Icon={<HashTagIcon/>} />
          </div>
        </div>
      ) : (
        <div className="w-14 h-screen bg-white transition-all duration-500">
          <div className="flex items-center justify-center gap-2 px-2 pt-6">
            <button onClick={handleMenu}>
              <MiniMenuIcon />
            </button>
          </div>
          <div className="pt-4">
           <MiniSideBarComponent Icon={<AllContentIcon />} />
           <MiniSideBarComponent Icon={<TwitterIcon />} />
           <MiniSideBarComponent Icon={<YoutubeIcon />} />
           <MiniSideBarComponent Icon={<HashTagIcon />} />
          </div>
        </div>
      )}
    </div>
  );
}
