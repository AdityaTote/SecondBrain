import SiderBar from "@/components/brain/SiderBar";
import Script from "next/script";

interface BrainLayoutProps {
  children: React.ReactNode;
}

export default function BrainLayout({ children }: BrainLayoutProps) {
  return (
    <>
      <div className="flex h-screen">
        <SiderBar />
        <div className="flex-1 bg-gray-100">
          {children}
          <Script
            src="https://platform.twitter.com/widgets.js"
            strategy="lazyOnload"
          />
        </div>
      </div>
    </>
  );
}
