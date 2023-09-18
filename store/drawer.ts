import { create } from "zustand";

type DrawerStore = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));
