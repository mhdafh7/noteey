"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "react-feather";
import styles from "./styles.module.scss";

const LogoutButton = () => {
  const handleSignOut = () => {
    signOut();
  };
  return (
    <button onClick={handleSignOut} className={styles.logOutBtn}>
      <p>Logout</p>
      <LogOut size={18} />
    </button>
  );
};
export default LogoutButton;
