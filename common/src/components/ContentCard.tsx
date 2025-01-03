import ShareIcon from "@/icons/ShareIcon";
import Card from "./ui/Card";
import BinIcon from "@/icons/BinIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import Tags from "./ui/Tags";
import Link from "next/link";
import { getTagTitle } from "@/lib/fetchBrain";

interface ContentProp {
  id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
  tags: string[];
  date: string;
}

export default function ContentCard({ title, link, type, tags, date }: ContentProp) {
  const strToDate = new Date(date);
  const day = String(strToDate.getUTCDate()).padStart(2, "0");
  const month = String(strToDate.getUTCMonth()+1).padStart(2, "0");
  const year = strToDate.getUTCFullYear();
  const formatedDate = `${day}/${month}/${year}`;
  return (
    <Card className="p-2 rounded-lg max-w-72  border min-h-48 min-w-72">
      <div className="flex items-center justify-between gap-8">
        <div className="flex gap-2 items-center">
          <YoutubeIcon />
          <h1>{title}</h1>
        </div>
        <div className="flex gap-2 ml-auto">
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
            className="w-full rounded-md"
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
        <div className="flex gap-2 pt-3">
          {tags.map(async (data, index) => {
            const tag = await getTagTitle(data.$oid);
            return <Tags key={index} text={tag} />;
          })}
        </div>
        <div className={`pt-2 text-gray-500 text-sm`}>
          Added on : {formatedDate}
        </div>
      </div>
    </Card>
  );
}
