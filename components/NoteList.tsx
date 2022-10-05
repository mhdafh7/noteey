import styles from '../styles/NoteList.module.scss'
import Note from './Note'

const NoteList = ({ noteList }) => {

  return (
    noteList.length !== 0 ?
      (<div className={styles.container}>
        {noteList.map((note) => {
          return (
            <Note id={note.id} key={note.id} title={note.title} body={note.body} isPinned={note.isPinned} />
          )
        })}
      </div>) : (<div className={styles.emptyContainer}><h4 className={styles.emptyMessage}>Notes you add appear here</h4></div>)
  )
}
export default NoteList