import styles from './styles.module.scss';
import AddNote from '../AddNote';
import { DocumentData } from '@firebase/firestore-types';

const TabBar = ({ notesRef }: DocumentData) => {
  return (
    <div className={styles.container}>
      <AddNote notesRef={notesRef} />
    </div>
  );
};
export default TabBar;
