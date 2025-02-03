import BinIcon from "@/icons/BinIcon";
import ShareIcon from "@/icons/ShareIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import { getTitle } from "@/lib/getCustomData";
import Tags from "../ui/Tags";

export function YoutubeContentPreview() {
  const videoId = "M7lc1UVf-VE";
  const title = "WERTYU";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor";
  const tags = [{ $oid: { $oid: "123456789" } }];

  return (
    <div className="rounded-lg shadow-sm p-4 space-y-4">
      <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <YoutubeIcon />
          <div>
            <h1 className="font-medium text-gray-900 line-clamp-1">{title}</h1>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <ShareIcon />
          <BinIcon />
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">
        {description || "No Description"}
      </p>
      <div className="flex flex-wrap gap-2 pt-3">
        {tags.map(async (data, index) => {
          const id = String(data.$oid.$oid);
          const tag = await getTitle(id);
          return <Tags key={index} text={tag} />;
        })}
      </div>
    </div>
  );
}
