"use client";

import { usePathname } from "next/navigation";
import DrawerButton from "./DrawerButton";
import LogoutButton from "./LogoutButton";

import styles from "./styles.module.scss";
import { UrlEnum } from "@/enum/url";

const Header = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const logoText = currentPath === UrlEnum.TRASH ? "Trash" : "Noteey";

  return (
    <>
      <header className={styles.container}>
        <DrawerButton />
        <div className={styles.logo}>{logoText}</div>
        {/* TODO search */}
        <LogoutButton />
      </header>
    </>
  );
};
export default Header;
