import Modal from '../Modal';
import styles from './Note.module.scss';
import { useState } from 'react';
import { Note } from '../../types';

const Note = ({ id, title, body, isPinned }: Note) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {isPinned && (
          <span className={styles.pinned}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.828 0.721986C8.89371 0.721868 8.95879 0.734702 9.01954 0.759754C9.08028 0.784806 9.13549 0.821584 9.182 0.867986L14.132 5.81799C14.2257 5.91175 14.2784 6.0389 14.2784 6.17149C14.2784 6.30407 14.2257 6.43122 14.132 6.52499C13.652 7.00499 13.06 7.11299 12.629 7.11299C12.452 7.11299 12.294 7.09499 12.169 7.07399L9.035 10.208C9.11751 10.5404 9.17104 10.8793 9.195 11.221C9.241 11.923 9.16301 12.908 8.47501 13.596C8.38124 13.6897 8.25409 13.7424 8.1215 13.7424C7.98892 13.7424 7.86177 13.6897 7.768 13.596L4.939 10.768L1.757 13.95C1.562 14.145 0.538004 14.852 0.343004 14.657C0.148004 14.462 0.855004 13.437 1.05 13.243L4.232 10.061L1.404 7.23199C1.31027 7.13822 1.25761 7.01107 1.25761 6.87849C1.25761 6.7459 1.31027 6.61875 1.404 6.52499C2.092 5.83699 3.077 5.75799 3.779 5.80499C4.12066 5.82893 4.4596 5.88246 4.792 5.96499L7.926 2.83199C7.89985 2.6797 7.88647 2.5255 7.886 2.37099C7.886 1.94099 7.99401 1.34899 8.47501 0.867986C8.56871 0.774517 8.69565 0.722014 8.828 0.721986V0.721986Z"
                fill="#1D1D1B"
              />
            </svg>
          </span>
        )}

        {title === '' && body === '' ? (
          <div className={styles.title}>Empty Note</div>
        ) : (
          <div className={styles.title}>{title}</div>
        )}
        <div className={styles.body}>{body}</div>
      </div>
      <Modal
        title={title}
        body={body}
        id={id}
        showModal={showModal}
        isPinned={isPinned}
        setShowModal={setShowModal}
      />
    </>
  );
};
export default Note;
