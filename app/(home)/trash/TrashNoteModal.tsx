"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useTrashStore } from "@/store/trash";
import NoteMutation from "@/libs/hooks/mutations/note";
import RoundSpinner from "@/components/Loaders/RoundSpinner";

import styles from "./trash.module.scss";

const TrashNoteModal = () => {
  const { currentTrashNote, setIsTrashNoteModalOpen } = useTrashStore();

  const restoreNoteMutation = NoteMutation.useRestoreNote(currentTrashNote.id);
  const deleteNoteMutation = NoteMutation.useDeleteNoteFromTrash(
    currentTrashNote.id
  );

  const handleClose = () => {
    setIsTrashNoteModalOpen(false);
  };

  const handleRestore = () => {
    restoreNoteMutation.mutate();
  };
  const handleDelete = () => {
    deleteNoteMutation.mutate();
  };

  useEffect(() => {
    if (restoreNoteMutation.isSuccess || deleteNoteMutation.isSuccess) {
      handleClose();
    }
  }, [restoreNoteMutation.isSuccess, deleteNoteMutation.isSuccess]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <aside className={styles.trashNoteModal}>
        <div className={styles.content}>
          <h1 className={styles.title}>{currentTrashNote.title}</h1>
          <p className={styles.description}>{currentTrashNote.description}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.restore} onClick={handleRestore}>
            {restoreNoteMutation.isLoading ? (
              <RoundSpinner scale={0.4} />
            ) : (
              "Restore"
            )}
          </button>
          <button className={styles.delete} onClick={handleDelete}>
            {restoreNoteMutation.isLoading ? (
              <RoundSpinner scale={0.4} />
            ) : (
              "Delete forever"
            )}
          </button>
        </div>
      </aside>
    </>,
    document.body
  );
};

export default TrashNoteModal;
