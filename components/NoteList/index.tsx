import styles from './NoteList.module.scss';
import Note from '../Note';
import { DocumentData } from '@firebase/firestore-types';

const NoteList = ({ noteList }: any) => {
  return noteList.length !== 0 ? (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Pinned Notes</h3>
        <div className={styles.noteListContainer}>
          {noteList.map((note: DocumentData) => {
            if (note.isPinned)
              return (
                <Note
                  id={note.id}
                  key={note.id}
                  title={note.title}
                  body={note.body}
                  isPinned={note.isPinned}
                />
              );
          })}
        </div>
      </div>
      <div className={styles.container}>
        <hr />
        <div className={styles.noteListContainer}>
          {noteList.map((note: DocumentData) => {
            if (!note.isPinned)
              return (
                <Note
                  id={note.id}
                  key={note.id}
                  title={note.title}
                  body={note.body}
                  isPinned={note.isPinned}
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
