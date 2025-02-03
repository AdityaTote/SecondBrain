// {type === "youtube" && (
//     <iframe
//       className="w-full aspect-video rounded-md"
//       src={`https://www.youtube.com/embed/${
//         link.match(
//           /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([a-zA-Z0-9_-]{11})/
//         )?.[1]
//       }`}
//       title="YouTube video player"
//       frameBorder="0"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//       referrerPolicy="strict-origin-when-cross-origin"
//       allowFullScreen
//     ></iframe>
//   )}

//   {type === "twitter" && (
//     <blockquote className="twitter-tweet">
//       <a href={link.replace("x", "twitter")}></a>
//     </blockquote>
//   )}