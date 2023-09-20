"use client";

import { ArrowLeft } from "react-feather";
import { useTrashStore } from "@/store/trash";
import styles from "./trash.module.scss";

const MobileNoteModal = () => {
  const { currentTrashNote, setIsTrashNoteModalOpen } = useTrashStore();
  const closeModal = () => {
    setIsTrashNoteModalOpen(false);
  };
  const handleRestore = () => {};
  const handleDelete = () => {};

  return (
    <div className={styles.mobileTrashNoteModal}>
      <nav className={styles.topBar}>
        <button className={styles.back} onClick={closeModal}>
          <ArrowLeft size={32} />
        </button>
      </nav>
      <div className={styles.content}>
        <h1 className={styles.title}>{currentTrashNote.title}</h1>
        <p className={styles.description}>{currentTrashNote.description}</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.restore} onClick={handleRestore}>
          Restore
        </button>
        <button className={styles.delete} onClick={handleDelete}>
          Delete Forever
        </button>
      </div>
    </div>
  );
};
export default MobileNoteModal;
