import styles from './TabBar.module.scss';
import AddNote from '../AddNote';
import { DocumentReference } from '@firebase/firestore-types';

const TabBar = ({ notesRef }: any) => {
  return (
    <div className={styles.container}>
      <AddNote notesRef={notesRef} />
    </div>
  );
};
export default TabBar;
