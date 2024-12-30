interface MiniSideBarComponentProps {
    Icon: React.ReactElement;
}

export default function MiniSideBarComponent({Icon}: MiniSideBarComponentProps) {
  return (
    <div className="py-1 px-4 flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer">
      {Icon}
    </div>
  );
}
