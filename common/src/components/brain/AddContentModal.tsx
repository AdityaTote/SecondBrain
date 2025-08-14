"use client";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Input from "../ui/Input";
import { addBtnStore, typeStore } from "@/store/store";
import { Button } from "../ui/Button";
import { contentSchema } from "@/types/schema";
// import { postUrl } from "@/lib/postUrl";
import { UserType } from "@/types/types";
import LoadingIcon from "@/icons/LoadingIcon";
import { useRouter } from "next/navigation";
import { postUrl } from "@/lib/postUrl";
import { backendURL } from "@/lib/constants";

export default function AddContentModal({ user }: { user: UserType }) {
	const router = useRouter();
	const handleAddBtnClose = addBtnStore((state) => state.close);
	const titleRef = useRef<HTMLInputElement>(null);
	const linkRef = useRef<HTMLInputElement>(null);
	const tagsRef = useRef<HTMLInputElement>(null);
	const types = typeStore((state) => state.value);
	const [loading, setLoading] = useState<boolean>(false);
	console.log(tagsRef.current?.value);

	const successNotify = (msg: string) =>
		toast.success(msg, { autoClose: 1000 });
	const errorNotify = (msg: string) => toast.error(msg, { autoClose: 2000 });

	const handleAddContent = async () => {
		setLoading(true);
		const data = {
			title: titleRef.current?.value.trim(),
			link: linkRef.current?.value.trim(),
			tags: tagsRef.current?.value.trim(),
			types: types,
			description: "No Description",
		};
		console.log(data);
		const contentData = contentSchema.safeParse(data);

		if (!contentData.success) {
			errorNotify(contentData.error.errors[0].message);
			setLoading(false);
			return;
		}

		const res = await postUrl({
			url: `${backendURL}/api/content`,
			token: user?.token,
			data: contentData.data,
		});

		if (!res) {
			setLoading(false);
			errorNotify("Server Error is busy");
		}

		if (res.error === true) {
			setLoading(false);
			errorNotify(res.message);
			return;
		}

		if (res.error === false) {
			setLoading(false);
			successNotify(res.message);
			router.push("/brain");
			if (handleAddBtnClose) {
				handleAddBtnClose();
			}
			return;
		}
	};

	return (
		<div className="grid grid-cols-1 gap-2 transition-all duration-1000">
			<Input
				label="Title"
				refs={titleRef}
				placeholder="enter the title.."
				required={true}
				type="text"
			/>
			<Input
				label="Link"
				refs={linkRef}
				placeholder="paste the link.."
				required={true}
				type="text"
			/>
			<div className="grid justify-evenly items-center pt-2 grid-cols-1 lg:flex lg:items-center lg:justify-evenly gap-2">
				<TypeDropDown />
				<Input
					variant="primary"
					label="Tags"
					refs={tagsRef}
					placeholder="e.g. #trending"
					required={true}
					type="text"
				/>
			</div>
			<div className="flex justify-center items-center pt-2 pb-1 gap-4">
				<Button variant={"destructive"} onClick={handleAddBtnClose}>
					Cancel
				</Button>
				{loading ? (
					<Button className="p-4 flex justify-center items-center" disabled>
						<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
							<LoadingIcon />
						</svg>
						Adding Content...
					</Button>
				) : (
					<Button variant={"default"} onClick={handleAddContent}>
						Add Content
					</Button>
				)}
			</div>
			<ToastContainer position="bottom-right" limit={2} />
		</div>
	);
}

function TypeDropDown() {
	const types = typeStore((state) => state.setVal);
	const typesVal = typeStore((state) => state.value);

	const option = [
		{ value: "youtube", label: "Youtube" },
		{ value: "twitter", label: "Twitter" },
		{ value: "instagram", label: "Instagram" },
		{ value: "other", label: "Other" },
	];
	// dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
	return (
		<div className="">
			<label htmlFor="type">Type of Content</label>
			<select
				className="bg-gray-50 border mt-2 p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
				value={typesVal}
				onChange={(e) => types(e.target.value)}
			>
				{option.map((opt, index) => (
					<option className="p-2 rounded-md" key={index} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}
