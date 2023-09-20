"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "react-feather";
import RoundSpinner from "../Loaders/RoundSpinner";

import styles from "./styles.module.scss";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const handleSignOut = () => {
    setLoading(true);
    signOut();
  };
  return (
    <button onClick={handleSignOut} className={styles.logOutBtn}>
      {loading ? (
        <RoundSpinner scale={0.4} />
      ) : (
        <>
          <p>Logout</p>
          <LogOut size={18} />
        </>
      )}
    </button>
  );
};
export default LogoutButton;
