"use client";

import { Edit2, Trash } from "react-feather";
import { DrawerState, useDrawerStore } from "@/store/drawer";

import styles from "./styles.module.scss";
import Link from "next/link";

const DrawerMenu = () => {
  const { activeTab, isDrawerOpen, toggleDrawer } = useDrawerStore();

  const drawerClass = isDrawerOpen
    ? `${styles.container} ${styles.open}`
    : styles.container;

  return (
    <>
      <nav className={drawerClass}>
        <ul className={styles.list}>
          <Link
            href={"/"}
            className={
              activeTab === DrawerState.HOME
                ? `${styles.activeTab}`
                : `${styles.listItem}`
            }
          >
            <Edit2 fill="#272727" />
            <p>Notes</p>
          </Link>
          <Link
            href={"/trash"}
            className={
              activeTab === DrawerState.TRASH
                ? `${styles.activeTab}`
                : `${styles.listItem}`
            }
          >
            <Trash fill="#272727" />
            <p>Trash</p>
          </Link>
        </ul>
      </nav>
      {isDrawerOpen ? (
        <div
          className={styles.overlay}
          aria-hidden
          onClick={toggleDrawer}
        ></div>
      ) : null}
    </>
  );
};
export default DrawerMenu;
