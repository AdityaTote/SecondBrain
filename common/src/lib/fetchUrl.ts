import axios from "axios"

interface fetchUrlProps {
    url: string;
    token: string
}

export async function fetchUrl({url, token}: fetchUrlProps) {
    const res = await axios.get(url,{
        headers: {
            "Content-Type": "application/json",
            "token": token
        }
    })
    return res
}