"use client";

import ReactDOM from "react-dom";
import { useTrashStore } from "@/store/trash";

import styles from "./trash.module.scss";

const TrashNoteModal = () => {
  const { currentTrashNote, setIsTrashNoteModalOpen } = useTrashStore();

  const handleClose = () => {
    setIsTrashNoteModalOpen(false);
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <aside className={styles.trashNoteModal}>
        <div className={styles.content}>
          <h1 className={styles.title}>{currentTrashNote.title}</h1>
          <p className={styles.description}>{currentTrashNote.description}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.restore}>Restore</button>
          <button className={styles.delete}>Delete</button>
        </div>
      </aside>
    </>,
    document.body
  );
};

export default TrashNoteModal;
