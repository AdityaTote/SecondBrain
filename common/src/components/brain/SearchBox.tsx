// import SearchIcon from "@/icons/SearchIcon";
import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <div className="flex relative flex-col p-2">
      <input
        className="w-full py-4 px-6 rounded-full shadow-md pr-14 pl-14"
        placeholder="Search your memories..."
      />
      <div className="absolute top-1/3 pl-4">
        <Search />
      </div>
    </div>
  );
}
