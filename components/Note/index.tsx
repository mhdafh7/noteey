import { Note } from "@prisma/client";

import { useCurrentNoteStore } from "@/store/note";
import { Pin } from "../Svgs/Pins";

import styles from "./styles.module.scss";

const Note = (note: Note) => {
  const setCurrentNote = useCurrentNoteStore((state) => state.setCurrentNote);
  const setModalOpen = useCurrentNoteStore((state) => state.setIsNoteModalOpen);

  return (
    <>
      <article
        className={styles.container}
        onClick={() => {
          setCurrentNote(note);
          setModalOpen(true);
        }}
      >
        {note.isPinned ? (
          <span className={styles.pinned}>
            <Pin />
          </span>
        ) : null}

        {note.title === "" && note.description === "" ? (
          <div className={styles.title}>Empty Note</div>
        ) : (
          <div className={styles.title}>{note.title}</div>
        )}
        <p className={styles.body}>{note.description}</p>
      </article>
    </>
  );
};
export default Note;
