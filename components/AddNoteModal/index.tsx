import { useContext, useState } from "react";
import { ArrowLeft } from "react-feather";
import { Pin, UnPin } from "../Svgs/Pins";
import Delete from "../Svgs/Delete";
import styles from "./styles.module.scss";
import { ModalContext } from "@/context/ModalContext";

type FormEvent = {
  preventDefault: () => void;
};
type inputChange = {
  target: { value: string };
};

const AddNoteModal = ({ isEdit = false }) => {
  const { closeModal, modalData } = useContext(ModalContext);
  const { title, body, isPinned: isNotePinned } = modalData;

  const [isPinned, setIsPinned] = useState(isNotePinned);
  const [modalTitle, setModalTitle] = useState(title);
  const [modalBody, setModalBody] = useState(body);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleTitleChange = (e: inputChange) => {
    setModalTitle(e.target.value);
  };

  const handleBodyChange = (e: inputChange) => {
    setModalBody(e.target.value);
  };
  return (
    <div className={styles.container}>
      <nav className={styles.topBar}>
        <button className={styles.back} onClick={closeModal}>
          <ArrowLeft size={32} />
        </button>

        <div className={styles.actions}>
          {!isPinned ? (
            <span
              title="Pin note"
              className={styles.pinned}
              onClick={() => {
                setIsPinned(!isPinned);
              }}
            >
              <Pin />
            </span>
          ) : (
            <span
              title="Unpin note"
              className={styles.unpinned}
              onClick={() => {
                setIsPinned(!isPinned);
              }}
            >
              <UnPin />
            </span>
          )}
          {isEdit ? (
            <button className={styles.delete}>
              <Delete />
            </button>
          ) : null}
        </div>
      </nav>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.formGroup}>
          <input
            className={styles.title}
            type="text"
            placeholder="Title"
            onChange={handleTitleChange}
            value={modalTitle}
          />
          <textarea
            className={styles.body}
            cols={20}
            rows={6}
            placeholder="note it here..."
            onChange={handleBodyChange}
            value={modalBody}
          />
        </section>
        <button type="submit" disabled={modalBody === "" && modalTitle === ""}>
          Save note
        </button>
      </form>
    </div>
  );
};
export default AddNoteModal;
