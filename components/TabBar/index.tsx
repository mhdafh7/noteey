import styles from './styles.module.scss';
import AddNote from '../AddNote';

const TabBar = () => {
  return (
    <div className={styles.container}>
      <AddNote />
    </div>
  );
};
export default TabBar;
