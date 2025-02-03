import ShareIcon from "@/icons/ShareIcon";
import Card from "../ui/Card";
import BinIcon from "@/icons/BinIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import Tags from "../ui/Tags";
import Link from "next/link";
import { getTitle } from "@/lib/getCustomData";

interface ContentProp {
  id: string;
  title: string;
  description: string;
  tags: { $oid: { $oid: string } }[];
  date: string;
}

export default function ContentCard({
  id,
  title,
  description,
  tags,
  date,
}: ContentProp) {
  const strToDate = new Date(date);
  const day = String(strToDate.getUTCDate()).padStart(2, "0");
  const month = String(strToDate.getUTCMonth() + 1).padStart(2, "0");
  const year = strToDate.getUTCFullYear();
  const formatedDate = `${day}/${month}/${year}`;

  function shortDescription(description: string) {
    if(description.length > 100) {
      return description.slice(0, 100-3) + "...";
    }
    return description;
  }
  
  return (
    <Card className="rounded-lg  border overflow-hidden">
      <div className="p-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 items-center overflow-hidden">
            <YoutubeIcon />
            <h1 className="truncate">{title}</h1>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href={`/brain/${id}`} replace legacyBehavior>
              <a target="_blank">
                <ShareIcon />
              </a>
            </Link>
            <button>
              <BinIcon />
            </button>
          </div>
        </div>
        <div className="pt-4">
          <div className="text-">
            <p>{shortDescription(description)}</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-3">
            {tags.map(async (data, index) => {
              const id = String(data.$oid.$oid);
              const tag = await getTitle(id);
              return <Tags key={index} text={tag} />;
            })}
          </div>
          <div className="pt-2 text-gray-500 text-sm">
            Added on : {formatedDate}
          </div>
        </div>
      </div>
    </Card>
  );
}