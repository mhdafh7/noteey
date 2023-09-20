"use client";

import { Plus } from "react-feather";
import { useCurrentNoteStore } from "@/store/note";
import styles from "./styles.module.scss";

const MobileBottomNavbar = () => {
  const setIsModalOpen = useCurrentNoteStore(
    (state) => state.setIsNoteModalOpen
  );

  const handleClick = () => {
    setIsModalOpen(true);
  };
  return (
    <nav className={styles.container}>
      <button className={styles.FAB} onClick={handleClick}>
        <Plus size={36} />
      </button>
    </nav>
  );
};

export default MobileBottomNavbar;
