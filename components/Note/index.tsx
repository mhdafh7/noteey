import { Note } from "@prisma/client";

import { useCurrentNoteStore } from "@/store/note";
import { Pin } from "../Svgs/Pins";

import styles from "./styles.module.scss";

const Note = (note: Omit<Note, "deleted">) => {
  const setCurrentNote = useCurrentNoteStore((state) => state.setCurrentNote);
  const setModalOpen = useCurrentNoteStore((state) => state.setIsNoteModalOpen);

  return (
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
      ) : note.title !== "" ? (
        <div className={styles.title}>{note.title}</div>
      ) : null}
      <p className={styles.body}>{note.description}</p>
    </article>
  );
};
export default Note;
