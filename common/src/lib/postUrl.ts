import { ContentType } from "@/types/types";
import axios from "axios"

interface fetchUrlProps {
    url: string;
    token: string;
    data: ContentType
}

export async function postUrl({url, token, data}: fetchUrlProps) {
    const res = await axios.post(url,{
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
        data
    })
    return res.data
}