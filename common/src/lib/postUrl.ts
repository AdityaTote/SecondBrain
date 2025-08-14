import { ContentType } from "@/types/types";
import axios from "axios";

interface fetchUrlProps {
	url: string;
	token: string;
	data: ContentType;
}

export async function postUrl({ url, token, data }: fetchUrlProps) {
	try {
		const res = await axios.post(url, data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Handle Axios-specific errors
			throw new Error(
				`Request failed: ${error.response?.status} - ${
					error.response?.data?.message || error.message
				}`
			);
		} else {
			// Handle other errors
			throw new Error(
				`Request failed: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	}
}

export async function deleteBrainContent({
	url,
	id,
	token,
}: {
	url: string;
	id: string;
	token: string;
}) {
	try {
		const res = await axios.delete(url, {
			data: {
				content_id: id,
			},
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				`Request failed: ${error.response?.status} - ${
					error.response?.data?.message || error.message
				}`
			);
		} else {
			throw new Error(
				`Request failed: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	}
}
