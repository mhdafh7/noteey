"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Edit2, Trash } from "react-feather";
import { usePathname } from "next/navigation";
import { useDrawerStore } from "@/store/drawer";
import { UrlEnum } from "@/enum/url";

import styles from "./styles.module.scss";

const DrawerMenu = () => {
  const { activeTab, isDrawerOpen, setCurrentSelected, toggleDrawer } =
    useDrawerStore();

  const currentPath = usePathname();

  const drawerClass = isDrawerOpen
    ? `${styles.container} ${styles.open}`
    : styles.container;

  useEffect(() => {
    if (currentPath === "/") {
      setCurrentSelected(UrlEnum.HOME);
    } else if (currentPath === "/trash") {
      setCurrentSelected(UrlEnum.TRASH);
    }
  }, [currentPath, setCurrentSelected]);

  return (
    <>
      <nav className={drawerClass}>
        <ul className={styles.list}>
          <Link
            href={"/"}
            className={
              activeTab === UrlEnum.HOME
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
              activeTab === UrlEnum.TRASH
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
