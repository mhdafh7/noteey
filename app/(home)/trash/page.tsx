"use client";

import { useEffect } from "react";

import Image from "next/image";

import { MasonryGrid } from "@egjs/react-grid";
import { AlertTriangle, RefreshCcw } from "react-feather";
import NoteQueries from "@/libs/hooks/queries/note";
import NoteMutation from "@/libs/hooks/mutations/note";
import { useCurrentNoteStore } from "@/store/note";
import Note from "@/components/Note";
import ListItemsSkelton from "@/components/NoteList/ListItemsSkelton";
import ConfirmEmptyTrashDialog from "./ConfirmEmptyTrashDialog";

import styles from "./trash.module.scss";

const Trash = () => {
  const getTrashItemsQuery = NoteQueries.useGetNotesInTrash();
  const { isConfirmEmptyTrashDialogOpen, setIsConfirmEmptyTrashDialogOpen } =
    useCurrentNoteStore();

  const restoreAllMutation = NoteMutation.useRestoreAllNotes();

  const renderNotes = () => (
    <MasonryGrid
      gap={29}
      defaultDirection="end"
      align="center"
      autoResize
      observeChildren={true}
      isConstantSize={false}
    >
      {getTrashItemsQuery.data?.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </MasonryGrid>
  );

  const handleEmptyTrash = () => {
    setIsConfirmEmptyTrashDialogOpen(true);
  };

  const handleRestoreAll = () => {
    restoreAllMutation.mutate();
  };

  useEffect(
    () => {
      if (restoreAllMutation.isSuccess) {
        getTrashItemsQuery.refetch();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [restoreAllMutation.isSuccess]
  );

  return (
    <>
      {isConfirmEmptyTrashDialogOpen ? <ConfirmEmptyTrashDialog /> : null}
      <main className={styles.container}>
        <header className={styles.header}>
          {getTrashItemsQuery.data?.length !== 0 ? (
            <>
              <button
                className={styles.emptyTrashBtn}
                onClick={handleEmptyTrash}
              >
                <AlertTriangle /> Empty Trash
              </button>
              <button
                className={styles.restoreAllBtn}
                onClick={handleRestoreAll}
              >
                <RefreshCcw /> Restore All
              </button>
            </>
          ) : null}
        </header>
        <section className={styles.noteList}>
          {getTrashItemsQuery.isLoading ? (
            <ListItemsSkelton />
          ) : getTrashItemsQuery.data?.length === 0 ? (
            <div className={styles.emptyMessage}>
              <Image
                src="/images/empty-box.png"
                width={300}
                height={300}
                alt="empty"
              />
              <h3>There is nothing here!</h3>
            </div>
          ) : (
            renderNotes()
          )}
        </section>
      </main>
    </>
  );
};
export default Trash;
