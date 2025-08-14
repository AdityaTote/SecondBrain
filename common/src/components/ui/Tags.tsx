interface TagsProps {
    text: string;
}

export default function Tags({text}: TagsProps){
    return(
        <div className="bg-purple-100  rounded-xl text-center p-1">
            {text}
        </div>
    )
}