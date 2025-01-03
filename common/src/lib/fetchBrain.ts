import axios from "axios";

const backendURL = "http://127.0.0.1:8000"

export  async function fetchBrain({ userId }: { userId: string }) {
  try {
    console.log("hi")
    console.log(userId)
    const res = await axios.get(`${backendURL}/api/content`, {
      headers: {
        "Content-Type": "application/json",
        "User-Id": "6777fc8bf227cb9ea91cdf20",
      },
    });
    if(!res.data.data){
      return null;
    }
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
}

export  async function getTagTitle(tagId: string){

    try {
      const res = await axios.post(`${backendURL}/api/tag`, {
        tag_id: tagId,
      })
      if(!res.data.data){
        return {
          title: "No title found"
        }
      }
      return res.data.data
    } catch (error) {
      console.error(error)
    }

}