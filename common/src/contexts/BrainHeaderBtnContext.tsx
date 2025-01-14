import React, { createContext, useState } from "react";

interface BrainHeaderBtnContextType {
  isShareBtnClicked: boolean;
  setIsShareBtnClicked: (value: boolean) => void;
  isAddContentBtnClicked: boolean;
  setIsAddContentBtnClicked: (value: boolean) => void;
}

export const BrainHeaderBtnCtx = createContext<BrainHeaderBtnContextType>({
    isShareBtnClicked: false,
    setIsShareBtnClicked: () => {},
    isAddContentBtnClicked: false,
    setIsAddContentBtnClicked: () => {},
});

export default function BrainHeaderBtnContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShareBtnClicked, setIsShareBtnClicked] = useState<boolean>(false);
  const [isAddContentBtnClicked, setIsAddContentBtnClicked] =
    useState<boolean>(false);

    console.log("isShareBtnClicked: ", isShareBtnClicked);
    console.log("isAddContentBtnClicked: ", isAddContentBtnClicked);

  return (
    <BrainHeaderBtnCtx.Provider
      value={{
        isShareBtnClicked,
        setIsShareBtnClicked,
        isAddContentBtnClicked,
        setIsAddContentBtnClicked,
      }}
    >
      {children}
    </BrainHeaderBtnCtx.Provider>
  );
}
