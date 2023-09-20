import { UrlEnum } from "@/enum/url";
import { create } from "zustand";

type DrawerStore = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  activeTab: UrlEnum;
  setCurrentSelected: (state: UrlEnum) => void;
};

export const useDrawerStore = create<DrawerStore>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  activeTab: UrlEnum.HOME,
  setCurrentSelected: (state) => set(() => ({ activeTab: state })),
}));
