import { MasonryGrid } from "@egjs/react-grid";
import NoteItem from "../Note";
import { Note } from "@/types";
import styles from "./styles.module.scss";

const NoteList = ({ noteList }: { noteList: Note[] }) => {
  const pinnedNotes = noteList.filter((note: Note) => note.isPinned);
  const unpinnedNotes = noteList.filter((note: Note) => !note.isPinned);

  return noteList.length !== 0 ? (
    <>
      {pinnedNotes.length > 0 && (
        <div className={styles.container}>
          <h3 className={styles.title}>
            Pinned <span>Notes</span>
          </h3>
          <MasonryGrid
            gap={20}
            defaultDirection="end"
            align="center"
            autoResize
          >
            {pinnedNotes.map((note: Note, index: number) => (
              <NoteItem
                id={note.id}
                key={note.id}
                title={note.title}
                body={note.body}
                isPinned={note.isPinned}
              />
            ))}
          </MasonryGrid>
          <hr />
        </div>
      )}
      <div className={styles.container}>
        <MasonryGrid gap={20} defaultDirection="end" align="center" autoResize>
          {unpinnedNotes.map((note: Note, index: number) => (
            <NoteItem
              id={note.id}
              key={note.id}
              title={note.title}
              body={note.body}
              isPinned={note.isPinned}
            />
          ))}
        </MasonryGrid>
      </div>
    </>
  ) : (
    <div className={styles.emptyContainer}>
      <h4 className={styles.emptyMessage}>Notes you add appear here</h4>
    </div>
  );
};
export default NoteList;
