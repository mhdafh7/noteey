"use client";

import { Edit2, Trash } from "react-feather";
import { useDrawerStore } from "@/store/drawer";

import styles from "./styles.module.scss";

const DrawerMenu = () => {
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);
  const drawerClass = isDrawerOpen
    ? `${styles.container} ${styles.open}`
    : styles.container;

  return (
    <nav className={drawerClass}>
      <ul className={styles.list}>
        <li>
          <Edit2 fill="#272727" />
          <p>Notes</p>
        </li>
        <li>
          <Trash fill="#272727" />
          <p>Trash</p>
        </li>
      </ul>
    </nav>
  );
};
export default DrawerMenu;
