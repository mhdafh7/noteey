import Modal from "../Modal";
import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import { Note } from "../../types";
import { Pin } from "../Svgs/Pins";
import { ModalContext } from "@/context/ModalContext";

type Props = Note & { color: string };
const Note = ({ id, title, body, isPinned, color }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { modalData, setModalData, openModal } = useContext(ModalContext);

  return (
    <>
      <article
        className={styles.container}
        onClick={() => {
          setShowModal(true);
          setModalData({ id, title, body, isPinned });
          openModal()
        }}
        style={{ backgroundColor: color }}
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
