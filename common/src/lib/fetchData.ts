import axios from "axios";

const backendURL = "http://127.0.0.1:8000";

export async function fetchBrain({ token }: { token: string }) {
  try {
    console.log(token);
    const res = await axios.get(`${backendURL}/api/content`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      error: !!res.data.error,
      message: res.data.message || "No message provided",
      data: res.data.data || null,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An error occurred while fetching data.",
      data: null,
    };
  }
}

export async function getTagTitle(tagId: string) {
  try {
    const res = await axios.post(`${backendURL}/api/tag`, {
      tag_id: tagId,
    });
    if (!res.data.data) {
      return {
        title: "No title found",
      };
    }
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCheck({ token }: { token: string }) {
  try {
    const res = await axios.get(`${backendURL}/api/content/check`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      error: !!res.data.error,
      message: res.data.message || "No message provided",
      data: res.data.data || null,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An error occurred while fetching data.",
      data: null,
    };
  }
}
