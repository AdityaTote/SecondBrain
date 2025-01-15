import { create } from "zustand";

interface StoreType {
    value: boolean;
    close?: () => void;
    open?: () => void;
    toggle?: () => void;
}

interface TypeStoreType {
    value: string;
    setVal: (val: string) => void;
}

export const slideStore = create<StoreType>((set) => ({
    value: false,
    toggle: () => set((state) => ({value: !state.value}))
}))

export const addBtnStore = create<StoreType>((set) => ({
    value: false,
    close: () => set({ value: false }),
    open: ()=> set({ value: true })
}))

export const shareBtnStore = create<StoreType>((set) => ({
    value: false,
    close: () => set({ value: false }),
    open: ()=> set({ value: true })
}))

export const typeStore = create<TypeStoreType>((set) => ({
    value: "other",
    setVal: (val: string) => set({ value: val })
}))