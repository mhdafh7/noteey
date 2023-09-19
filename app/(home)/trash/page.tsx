"use client";

import { MasonryGrid } from "@egjs/react-grid";
import { AlertTriangle, RefreshCcw } from "react-feather";
import NoteQueries from "@/libs/hooks/queries/note";
import Note from "@/components/Note";
import ListItemsSkelton from "@/components/NoteList/ListItemsSkelton";

import styles from "./trash.module.scss";
import { useCurrentNoteStore } from "@/store/note";
import ConfirmEmptyTrashDialog from "./ConfirmEmptyTrashDialog";

const Trash = () => {
  const getTrashItemsQuery = NoteQueries.useGetNotesInTrash();
  const { isConfirmEmptyTrashDialogOpen, setIsConfirmEmptyTrashDialogOpen } =
    useCurrentNoteStore();

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

  return (
    <>
      {isConfirmEmptyTrashDialogOpen ? <ConfirmEmptyTrashDialog /> : null}
      <main className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.title}>Trash</h3>
          <button className={styles.emptyTrashBtn} onClick={handleEmptyTrash}>
            <AlertTriangle /> Empty Trash
          </button>
          <button className={styles.restoreAllBtn}>
            <RefreshCcw /> Restore All
          </button>
        </header>
        <section className={styles.noteList}>
          {getTrashItemsQuery.isLoading ? (
            <ListItemsSkelton />
          ) : getTrashItemsQuery.data?.length === 0 ? (
            <p>Trash is empty!</p>
          ) : (
            renderNotes()
          )}
        </section>
      </main>
    </>
  );
};
export default Trash;
