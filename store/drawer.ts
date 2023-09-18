import { create } from "zustand";

export enum DrawerState {
  HOME = "/",
  TRASH = "/trash",
}

type DrawerStore = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  activeTab: DrawerState;
  setActiveTab: (state: DrawerState) => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  activeTab: DrawerState.HOME,
  setActiveTab: (state) => set(() => ({ activeTab: state })),
}));
