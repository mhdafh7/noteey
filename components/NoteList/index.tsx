"use client";

import { useEffect, useState } from "react";

import { Note } from "@prisma/client";
import { MasonryGrid } from "@egjs/react-grid";
import { useCurrentNoteStore } from "@/store/note";

import NoteItem from "../Note";
import NoteModal from "../NoteModal";
import MobileNoteModal from "../MobileNoteModal";

import styles from "./styles.module.scss";
import { useGetNotes } from "@/libs/hooks/queries/note";
import ListItemsSkelton from "./ListItemsSkelton";

const NoteList = () => {
  const notes = useGetNotes();
  const [noteList, setNoteList] = useState<Note[]>([]);

  const isNoteModalOpen = useCurrentNoteStore((state) => state.isNoteModalOpen);
  const setIsNoteModalOpen = useCurrentNoteStore(
    (state) => state.setIsNoteModalOpen
  );

  const pinnedNotes = noteList.filter((note: Note) => note.isPinned);
  const unpinnedNotes = noteList.filter((note: Note) => !note.isPinned);

  useEffect(() => {
    if (notes.isSuccess) {
      setNoteList(notes.data);
    } else if (notes.isError) {
      console.error(notes.error);
    }
  }, [notes]);

  return notes.isLoading ? (
    <ListItemsSkelton />
  ) : noteList.length !== 0 ? (
    <>
      {isNoteModalOpen ? (
        <>
          <NoteModal setIsModalOpen={setIsNoteModalOpen} />
          <MobileNoteModal />
        </>
      ) : null}
      <main className={styles.main}>
        {pinnedNotes.length > 0 && (
          <div className={styles.container}>
            <h3 className={styles.title}>
              Pinned <span>Notes</span>
            </h3>
            <MasonryGrid
              gap={23}
              defaultDirection="end"
              align="center"
              autoResize
            >
              {pinnedNotes.map((note: Note) => (
                <NoteItem
                  id={note.id}
                  key={note.id}
                  title={note.title}
                  description={note.description}
                  isPinned={note.isPinned}
                  createdAt={note.createdAt}
                  updatedAt={note.updatedAt}
                  ownerId={note.ownerId}
                />
              ))}
            </MasonryGrid>
            {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
              <span className={styles.lineWrapper}>
                <span className={styles.line}></span>
              </span>
            )}
          </div>
        )}
        <div className={styles.container}>
          <MasonryGrid
            gap={23}
            defaultDirection="end"
            align="center"
            autoResize
          >
            {unpinnedNotes.map((note: Note) => (
              <NoteItem
                id={note.id}
                key={note.id}
                title={note.title}
                description={note.description}
                isPinned={note.isPinned}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
                ownerId={note.ownerId}
              />
            ))}
          </MasonryGrid>
        </div>
      </main>
    </>
  ) : (
    <div className={styles.emptyContainer}>
      <h4 className={styles.emptyMessage}>Notes you add appear here</h4>
    </div>
  );
};
export default NoteList;
