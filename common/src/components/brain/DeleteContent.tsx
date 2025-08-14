"use client";

import BinIcon from "@/icons/BinIcon";
import { backendURL } from "@/lib/constants";
import { deleteBrainContent } from "@/lib/postUrl";
import { UserType } from "@/types/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DeleteContentProps {
	user: UserType;
	id: string;
}

export default function DeleteContent({ user, id }: DeleteContentProps) {
	const router = useRouter();

	async function handleDelete() {
		const { error, message } = await deleteBrainContent({
			url: `${backendURL}/api/content`,
			id: id,
			token: user.token,
		});
		if (error) {
			toast.error(message);
		} else {
			toast.success("Content deleted successfully");
		}
		router.refresh();
	}

	return (
		<button
			className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
			onClick={handleDelete}
		>
			<BinIcon />
		</button>
	);
}
