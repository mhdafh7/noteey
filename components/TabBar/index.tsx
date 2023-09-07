import styles from './styles.module.scss';
import AddNote from '../AddNoteInput';

const TabBar = () => {
  return (
    <div className={styles.container}>
      <AddNote />
    </div>
  );
};
export default TabBar;
