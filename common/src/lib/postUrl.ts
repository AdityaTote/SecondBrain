import { ContentType } from "@/types/types";
import axios from "axios";

interface fetchUrlProps {
  url: string;
  token: string;
  data: ContentType;
}

export async function postUrl({ url, token, data }: fetchUrlProps) {
  const res = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data);
  console.log("res: ", res);
  console.log("resdata: ", res.data);
  return res.data;
}
