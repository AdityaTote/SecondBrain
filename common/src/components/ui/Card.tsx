import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
      <div
        className={cn(
          "w-full h-full bg-white shadow-lg rounded-lg m-4",
          className
        )}
      >
        <h1 className="text-md font-medium px-4">{children}</h1>
      </div>
  );
}
