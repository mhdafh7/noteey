import { create } from "zustand";

export enum DrawerState {
  HOME = "/",
  TRASH = "/trash",
}

type DrawerStore = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  activeTab: DrawerState;
  setCurrentSelected: (state: DrawerState) => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  activeTab: DrawerState.HOME,
  setCurrentSelected: (state) => set(() => ({ activeTab: state })),
}));
