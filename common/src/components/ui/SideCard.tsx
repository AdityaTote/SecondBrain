import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SideBarCard({ children, className }: CardProps) {
  return (
    <div className="w-full">
      <div
        className={cn(
          "bg-white shadow-md rounded-lg hover:bg-slate-100 hover:shadow-lg hover:text-lg m-4",
          className
        )}
      >
        <h1 className="text-md font-medium px-4">{children}</h1>
      </div>
    </div>
  );
}
