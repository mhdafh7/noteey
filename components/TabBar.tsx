import styles from "../styles/TabBar.module.scss"
import AddNote from "./AddNote"


const TabBar = ({notesRef}) => {
    return (
        <div className={styles.container}>
            <AddNote notesRef={notesRef}/>
            {/* <div className={styles.tabs}>
                Archive
            </div> */}
        </div>
    )
}
export default TabBar
