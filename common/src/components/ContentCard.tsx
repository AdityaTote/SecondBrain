import ShareIcon from "@/icons/ShareIcon";
import Card from "./ui/Card";
import BinIcon from "@/icons/BinIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import Tags from "./ui/Tags";
import Link from "next/link";

interface ContentProp {
  id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
  tags: string[];
}

export default function ContentCard({
  id,
  title,
  link,
  type,
  tags,
}: ContentProp) {
  return (
    <Card className="p-2 rounded-lg max-w-72  border min-h-48 min-w-72">
      <div className="flex items-center justify-between gap-8">
        <div className="flex gap-2">
          <YoutubeIcon />
          <h1>{title} {id}</h1>
        </div>
        <div className="flex gap-2 ml-auto">
          <Link href={link}>
            <ShareIcon />
          </Link>
          <button>
            <BinIcon />
          </button>
        </div>
      </div>

      {type === "youtube" && (
        <iframe
          className="w-full rounded-md"
          src={`https://www.youtube.com/embed/${link.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([a-zA-Z0-9_-]{11})/)?.[1]}`}
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
        <div className="flex gap-2 pt-1">
      {tags.map((data, index) => (
          <Tags key={index} text={data} />
        ))}
        </div>
    </Card>
  );
}
