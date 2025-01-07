import React, { createContext, useState } from "react";

interface BrainHeaderBtnContextType {
  isShareBtnClicked: boolean;
  setIsShareBtnClicked: (value: boolean) => void;
  isAddContentBtnClicked: boolean;
  setIsAddContentBtnClicked: (value: boolean) => void;
}

export const BrainHeaderBtnCtx = createContext<BrainHeaderBtnContextType>({} as BrainHeaderBtnContextType);

export default function BrainHeaderBtnContext({ children }: { children: React.ReactNode }) {
    const [isShareBtnClicked, setIsShareBtnClicked] = useState(false);
    const [isAddContentBtnClicked, setIsAddContentBtnClicked] = useState(false);

    return(
        <BrainHeaderBtnCtx.Provider value={{isShareBtnClicked, setIsShareBtnClicked, isAddContentBtnClicked, setIsAddContentBtnClicked}}>
            {children}
        </BrainHeaderBtnCtx.Provider>
    )

}