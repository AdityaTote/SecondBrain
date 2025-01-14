import { create } from "zustand";

interface StoreType {
    value: boolean;
    toggle: () => void;
}

export const slideStore = create<StoreType>((set) => ({
    value: false,
    toggle: () => set((state) => ({ value: !state.value })),
}))

export const addBtnStore = create<StoreType>((set) => ({
    value: false,
    toggle: () => set((state) => ({ value: !state.value })),
}))

export const shareBtnStore = create<StoreType>((set) => ({
    value: false,
    toggle: () => set((state) => ({ value: !state.value })),
}))