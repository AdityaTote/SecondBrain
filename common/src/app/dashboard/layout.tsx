import SiderBar from "@/components/SiderBar";

interface DashLayoutProps {
    children: React.ReactNode;
}

export default function DashLayout({ children }: DashLayoutProps) {
    return (
        <div>
            <SiderBar/>
            {children}
        </div>
    );
}