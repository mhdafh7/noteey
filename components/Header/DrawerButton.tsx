"use client";

import { Menu } from "react-feather";
import { useDrawerStore } from "@/store/drawer";
import styles from "./styles.module.scss";

const DrawerButton = () => {
  const setIsDrawerOpen = useDrawerStore((state) => state.setIsDrawerOpen);

  const handleClick = () => {
    setIsDrawerOpen(true);
  };
  return (
    <button className={styles.menuButton} onClick={handleClick}>
      <Menu />
    </button>
  );
};
export default DrawerButton;
