import { cn } from "@/utils/cn";

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function Button({ className, children, onClick }: ButtonProps) {
    return(
        <button 
        className={cn("bg-purple-500 hover:bg-blue-900 text-white p-2 rounded-md", className)}
        onClick={onClick}
        >
            {children}
        </button>
    )
}