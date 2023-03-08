import Modal from "../Modal";
import styles from "./styles.module.scss";
import { useState } from "react";
import { Note } from "../../types";
import { Pin } from "../Svgs/Pins";

const Note = ({ id, title, body, isPinned }: Note) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article
        className={styles.container}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {isPinned ? (
          <span className={styles.pinned}>
            <Pin />
          </span>
        ) : null}

        {title === "" && body === "" ? (
          <div className={styles.title}>Empty Note</div>
        ) : (
          <div className={styles.title}>{title}</div>
        )}
        <p className={styles.body}>{body}</p>
      </article>
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
