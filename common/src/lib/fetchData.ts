import axios from "axios";

const backendURL = "http://127.0.0.1:8000"

export  async function fetchBrain({ token }: { token: string }) {
  try {
    console.log(token)
    const res = await axios.get(`${backendURL}/api/content`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

export  async function fetchCheck({ token }: { token: string }) {
  try {
    console.log(token)
    const res = await axios.get(`${backendURL}/api/content/check`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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