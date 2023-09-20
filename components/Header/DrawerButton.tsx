"use client";

import { Menu } from "react-feather";
import { useDrawerStore } from "@/store/drawer";
import styles from "./styles.module.scss";

const DrawerButton = () => {
  const toggleDrawer = useDrawerStore((state) => state.toggleDrawer);

  const handleClick = () => {
    toggleDrawer();
  };
  return (
    <button className={styles.menuButton} onClick={handleClick}>
      <Menu />
    </button>
  );
};
export default DrawerButton;
