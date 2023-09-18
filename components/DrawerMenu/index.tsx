"use client";

import { Edit2, Trash } from "react-feather";
import { usePathname } from "next/navigation";
import { DrawerState, useDrawerStore } from "@/store/drawer";

import styles from "./styles.module.scss";
import Link from "next/link";
import { useEffect } from "react";

const DrawerMenu = () => {
  const { activeTab, isDrawerOpen, setCurrentSelected, toggleDrawer } =
    useDrawerStore();

  const currentPath = usePathname();

  const drawerClass = isDrawerOpen
    ? `${styles.container} ${styles.open}`
    : styles.container;

  useEffect(() => {
    if (currentPath === "/") {
      setCurrentSelected(DrawerState.HOME);
    } else if (currentPath === "/trash") {
      setCurrentSelected(DrawerState.TRASH);
    }
  }, [currentPath, setCurrentSelected]);

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
