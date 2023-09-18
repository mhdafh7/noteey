import { create } from "zustand";

type DrawerStore = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  isDrawerOpen: false,
  setIsDrawerOpen: (isDrawerOpen: boolean) =>
    set((state) => ({
      ...state,
      isDrawerOpen,
    })),
}));