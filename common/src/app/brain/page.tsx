import ContentCard from "@/components/ContentCard";
import SiderBar from "@/components/SiderBar";

export default function BrainPage() {
  return (
    <div className="bg-gray-100 h-screen w-screen">
      <div className="fixed top-12 left-0">
        <SiderBar />
      </div>
      <div className="pl-14 pt-20 flex">
        <ContentCard
        id="1"
        title="youtube"
        link="https://youtu.be/8cVkLeCqUHk?si=lcTEf0dT3Km15cJe"
        tags={['tag1', 'tag2']}
        type="youtube"
        />
        <ContentCard
        id="2"
        title="twitter"
        link="https://x.com/AdityaTote24/status/1803428514583998850"
        tags={['tag1', 'tag2']}
        type="twitter"
        />
      </div>
    </div>
  );
}
