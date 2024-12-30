import axios from "axios"

export async function fetchUrl({url, userId}: {url: string, userId: string}) {
    const res = await axios.get(url,{
        data: {
            userId: userId
        }
    })
    return res.data.data
}