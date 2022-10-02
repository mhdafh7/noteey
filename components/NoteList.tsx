import styles from '../styles/NoteList.module.scss'
import Note from './Note'

const NoteList = ({ noteList }) => {

  return (
    <div className={styles.container}>
      {noteList.map((note) => {
        
        return (
            <Note id={note.id} key={note.id} title={note.title} body={note.body} isPinned={note.isPinned} />
        )
      })}
    </div>
  )
}
export default NoteList