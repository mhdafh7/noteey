"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      {children}
      <h5 className={styles.branding}>Noteey</h5>
      <ToastContainer theme="colored" limit={3} />
    </div>
  );
}
