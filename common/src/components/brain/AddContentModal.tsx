"use client";
import { useRef, useState } from "react";
import Input from "../ui/Input";
import { typeStore } from "@/store/store";
import { Button } from "../ui/Button";
import { contentSchema } from "@/types/schema";
import { toast } from "react-toastify";
import { postUrl } from "@/lib/postUrl";
import { UserType } from "@/types/types";

export default function AddContentModal({user}: {user: UserType}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const types = typeStore((state) => state.value);
  const [loading, setLoading] = useState<boolean>(false);

  const successNotify = (msg: string) => toast.success(msg,{ autoClose: 1000})
    const errorNotify = (msg: string) => toast.error(msg,{ autoClose: 2000})

  const handleAddContent = async() => {
    setLoading(true);
    const data = {
        title: titleRef.current?.value.trim(),
        link: linkRef.current?.value.trim(),
        tags: tagsRef.current?.value.trim().split(","),
        type: types
    }
    const contentData = contentSchema.safeParse(data);

    if(!contentData.success){
        setLoading(false)
        errorNotify(contentData.error.errors[0].message)
        return;        
    }

    const res = await postUrl({url: "http://localhost:8080/content", token: user?.token, data: contentData.data});

    if(res.)

  }

  return (
    <div className="flex flex-col gap-2 transition-all duration-1000">
      <Input
        label="Title"
        refs={titleRef}
        placeholder="Enter the title.."
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
      <div className="flex flex-flow-col justify-evenly items-center pt-2 gap-2">
        <TypeDropDown />
        <Input
          variant="primary"
          label="Tags"
          refs={tagsRef}
          placeholder="Enter the title.."
          required={true}
          type="text"
        />
      </div>
      <div className="flex justify-center items-center pt-2 pb-1">
        <Button variant={"default"} onClick={handleAddContent} >Add Content</Button>
      </div>
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
