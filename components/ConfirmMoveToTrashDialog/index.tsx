"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom";

import Image from "next/image";

import NoteMutation from "@/libs/hooks/mutations/note";
import { useCurrentNoteStore } from "@/store/note";

import styles from "./styles.module.scss";
import RoundSpinner from "../Loaders/RoundSpinner";

const ConfirmMoveToTrashDialog = () => {
  const currentNote = useCurrentNoteStore((state) => state.currentNote);
  const setIsModalOpen = useCurrentNoteStore(
    (state) => state.setIsNoteModalOpen
  );
  const setIsDialogOpen = useCurrentNoteStore(
    (state) => state.setIsConfirmMoveToTrashDialogOpen
  );

  const moveToTrashMutation = NoteMutation.useMoveToTrashNote(
    currentNote.id || ""
  );

  const handleMoveToTrash = () => {
    moveToTrashMutation.mutate();
  };

  useEffect(() => {
    if (moveToTrashMutation.isSuccess) {
      setIsModalOpen(false);
      setIsDialogOpen(false);
    }
  }, [moveToTrashMutation.isSuccess]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.container}>
        <div className={styles.title}>Move note to trash?</div>
        <Image
          src={"/images/trash-icon.png"}
          width={100}
          height={100}
          alt="trash can"
        />
        <div className={styles.buttons}>
          <button
            className={styles.cancelButton}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={handleMoveToTrash}>
            {moveToTrashMutation.isLoading ? (
              <RoundSpinner scale={0.4} />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </>,
    document.body
  );
};
export default ConfirmMoveToTrashDialog;
