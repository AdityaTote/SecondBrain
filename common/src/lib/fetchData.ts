import axios, { AxiosError } from "axios";

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
    console.log(error);
    if (error instanceof AxiosError) {
      return {
        error: true,
        message:
          error.response?.data.error ||
          "An error occurred while fetching data.",
        data: null,
      };
    } else {
      return {
        error: true,
        message: "An error occurred while fetching data.",
        data: null,
      };
    }
  }
}

export async function getTagTitle(tagId: string) {
  try {
    console.log(tagId);
    const res = await axios.get(`${backendURL}/api/tag/${tagId}`);
    return {
      error: !!res.data.error,
      message: res.data.message || "No message provided",
      data: res.data.data || null,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return {
        error: true,
        message:
          error.response?.data.error ||
          "An error occurred while fetching data.",
        data: null,
      };
    } else {
      return {
        error: true,
        message: "An error occurred while fetching data.",
        data: null,
      };
    }
  }
}

export async function getBrainContentById(brainId: string, token: string) {
  try {
    const res = await axios.get(`${backendURL}/api/content/${brainId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      error: !!res.data.error,
      message: res.data.message || "No message provided",
      data: res.data.data || null,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return {
        error: true,
        message:
          error.response?.data.error ||
          "An error occurred while fetching data.",
        data: null,
      };
    } else {
      return {
        error: true,
        message: "An error occurred while fetching data.",
        data: null,
      };
    }
  }
}
