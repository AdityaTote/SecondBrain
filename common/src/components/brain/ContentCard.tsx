import ShareIcon from "@/icons/ShareIcon";
import Card from "../ui/Card";
import BinIcon from "@/icons/BinIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import Tags from "../ui/Tags";
import Link from "next/link";
import { getTagTitle } from "@/lib/fetchData";

interface ContentProp {
  id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
  tags: { $oid: { $oid: string } }[];
  date: string;
}

async function getTitle(id: string) {
  const tag = await getTagTitle(id);
  return tag;
}

export default function ContentCard({
  title,
  link,
  type,
  tags,
  date,
}: ContentProp) {
  const strToDate = new Date(date);
  const day = String(strToDate.getUTCDate()).padStart(2, "0");
  const month = String(strToDate.getUTCMonth() + 1).padStart(2, "0");
  const year = strToDate.getUTCFullYear();
  const formatedDate = `${day}/${month}/${year}`;
  
  return (
    <Card className="rounded-lg  border overflow-hidden">
      <div className="p-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 items-center overflow-hidden">
            <YoutubeIcon />
            <h1 className="truncate">{title}</h1>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href={link} replace legacyBehavior>
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
          {type === "youtube" && (
            <iframe
              className="w-full aspect-video rounded-md"
              src={`https://www.youtube.com/embed/${
                link.match(
                  /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([a-zA-Z0-9_-]{11})/
                )?.[1]
              }`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x", "twitter")}></a>
            </blockquote>
          )}
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