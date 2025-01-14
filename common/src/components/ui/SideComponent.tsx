interface SideComponentProps {
  text?: string;
  Icon: React.ReactElement;
}

export default function SideComponent({ text, Icon }: SideComponentProps) {
  return (
    <>
      {text ? (
        <div className="flex items-center gap-2 py-3 px-8 hover:bg-gray-200 hover:cursor-pointer">
          {Icon}
          <div className={`text-md`}>{text}</div>
        </div>
      ) : (
        <div className="py-2 px-4 flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer">
          {Icon}
        </div>
      )}
    </>
  );
}
