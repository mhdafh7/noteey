"use client";

import { MasonryGrid } from "@egjs/react-grid";
import NoteQueries from "@/libs/hooks/queries/note";
import Note from "@/components/Note";
import ListItemsSkelton from "@/components/NoteList/ListItemsSkelton";

import styles from "./trash.module.scss";
import { AlertTriangle, RefreshCcw } from "react-feather";

const Trash = () => {
  const getTrashItemsQuery = NoteQueries.useGetNotesInTrash();

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

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.title}>Trash</h3>
        <button className={styles.emptyTrashBtn}>
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
  );
};
export default Trash;
