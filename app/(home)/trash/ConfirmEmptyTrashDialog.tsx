"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { useCurrentNoteStore } from "@/store/note";
import NoteMutation from "@/libs/hooks/mutations/note";
import RoundSpinner from "@/components/Loaders/RoundSpinner";

import styles from "./trash.module.scss";

const ConfirmEmptyTrashDialog = () => {
  const emptyTrashMutation = NoteMutation.useEmptyTrash();
  const { setIsConfirmEmptyTrashDialogOpen } = useCurrentNoteStore();

  const handleConfirmEmptyTrash = () => {
    emptyTrashMutation.mutate();
  };

  useEffect(() => {
    if (emptyTrashMutation.isSuccess) {
      setIsConfirmEmptyTrashDialogOpen(false);
    }
  }, [emptyTrashMutation.isSuccess]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.confirmDialog}>
        <div className={styles.title}>Empty Trash?</div>
        <Image
          src={"/images/empty-trash.png"}
          width={150}
          height={150}
          alt="trash can"
        />
        <div className={styles.buttons}>
          <button
            className={styles.cancelButton}
            onClick={() => setIsConfirmEmptyTrashDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            className={styles.confirmButton}
            onClick={handleConfirmEmptyTrash}
          >
            {emptyTrashMutation.isLoading ? (
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
export default ConfirmEmptyTrashDialog;
