"use client";
import TwitterIcon from "@/icons/TwitterIcon";
import SideBarCard from "./ui/Card";
import YoutubeIcon from "@/icons/YoutubeIcon";
import HashTagIcon from "@/icons/HashTagIcon";
import MenuIcon from "@/icons/MenuIcon";
import { useState } from "react";

export default function SiderBar() {

  const [menuOpen, setMenuOpen] = useState<boolean>(true);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div>
      {menuOpen ? 
        <div className="w-64 h-screen bg-indigo-50 transition-all duration-500">
          <div className="flex items-center gap-2 p-2">
            <button onClick={handleMenu}>
              <MenuIcon />
            </button>
            <div className="text-2xl font-bold text-center p-4">Menu</div>
          </div>
          <div>
            <SideBarCard className="py-1">
              <div className="flex items-center gap-1">
                <TwitterIcon />
                <div className={`text-md`}>Twitter</div>
              </div>
            </SideBarCard>
            <SideBarCard className="py-1">
              <div className="flex items-center gap-1">
                <YoutubeIcon />
                <div className={`text-md`}>Youtube</div>
              </div>
            </SideBarCard>
            <SideBarCard className="py-1">
              <div className="flex items-center gap-1">
                <HashTagIcon />
                <div className={`text-md`}>Hash Tags</div>
              </div>
            </SideBarCard>
          </div>
        </div>
      : <div className="w-14 h-screen bg-indigo-50 transition-all duration-500">
      <div className="flex items-center justify-center gap-2 p-2">
        <button onClick={handleMenu}>
          <MenuIcon />
        </button>
      </div>
      <div>
        <SideBarCard className="py-1 px-4 flex items-center justify-center">
            <TwitterIcon />
        </SideBarCard>
        <SideBarCard className="py-1 px-4 flex items-center justify-center">
            <YoutubeIcon />
        </SideBarCard>
        <SideBarCard className="py-1 px-4 flex items-center justify-center">
            <HashTagIcon />
        </SideBarCard>
      </div>
    </div> }
    </div>
  );
}