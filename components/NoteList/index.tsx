import styles from "./styles.module.scss";
import NoteItem from "../Note";
import { Note } from "@/types";

const colors = [
  "#DAFFDE",
  "#A6FAFF",
  "#B8FF9F",
  "#FFC29F",
  "#FFA6F6",
  "#A8A6FF",
  "#FF9F9F",
  "#FFF59F",
  "#9FFFF3",
];

const NoteList = ({ noteList }: { noteList: Note[] }) => {
  const assignRandomColors = (numNotes: number) => {
    const randomColors: string[] = [];
    const numColors = Math.min(numNotes, colors.length);

    while (randomColors.length < numColors) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      if (!randomColors.includes(randomColor)) {
        randomColors.push(randomColor);
      }
    }

    return randomColors;
  };

  const randomColors = assignRandomColors(noteList.length);
  let colorIndex = 0;

  const pinnedNotes = noteList.filter((note: Note) => note.isPinned);
  const unpinnedNotes = noteList.filter((note: Note) => !note.isPinned);

  return noteList.length !== 0 ? (
    <>
      {pinnedNotes.length > 0 && (
        <div className={styles.container}>
          <h3 className={styles.title}>
            Pinned <span>Notes</span>
          </h3>
          <div className={styles.noteListContainer}>
            {pinnedNotes.map((note: Note, index: number) => {
              const randomColor = randomColors[colorIndex];
              colorIndex = (colorIndex + 1) % randomColors.length;
              return (
                <NoteItem
                  id={note.id}
                  key={note.id}
                  title={note.title}
                  body={note.body}
                  isPinned={note.isPinned}
                  color={randomColor}
                />
              );
            })}
          </div>
          <hr />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.noteListContainer}>
          {unpinnedNotes.map((note: Note, index: number) => {
            const randomColor = randomColors[colorIndex];
            colorIndex = (colorIndex + 1) % randomColors.length;
            return (
              <NoteItem
                id={note.id}
                key={note.id}
                title={note.title}
                body={note.body}
                isPinned={note.isPinned}
                color={randomColor}
              />
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <div className={styles.emptyContainer}>
      <h4 className={styles.emptyMessage}>Notes you add appear here</h4>
    </div>
  );
};
export default NoteList;
