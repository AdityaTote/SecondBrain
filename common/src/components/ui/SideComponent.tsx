interface SideComponentProps {
    text: string;
    Icon: React.ReactElement;
}

export default function SideComponent({text, Icon}: SideComponentProps) {
  return (
    <div className="flex items-center gap-2 py-2 px-8 hover:bg-gray-200 hover:cursor-pointer">
      {Icon}
      <div className={`text-md`}>{text}</div>
    </div>
  );
}
