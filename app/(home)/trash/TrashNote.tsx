import { Note } from "@prisma/client";
import { Pin } from "@/components/Svgs/Pins";
import { useTrashStore } from "@/store/trash";

import styles from "./trash.module.scss";

const TrashNote = (note: Note) => {
  const { setIsTrashNoteModalOpen, setCurrentTrashNote } = useTrashStore();

  const handleClick = () => {
    setCurrentTrashNote({
      ...note,
    });
    setIsTrashNoteModalOpen(true);
  };
  return (
    <article className={styles.trashNote} onClick={handleClick}>
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
export default TrashNote;
