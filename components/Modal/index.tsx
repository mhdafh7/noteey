import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { db } from "../../libs/firebase/firebase";
import { Note } from "../../types";
import { Pin, UnPin } from "../Svgs/Pins";
import Delete from "../Svgs/Delete";

type stateProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
type Props = Note & stateProps;
const Modal = ({
  id,
  title,
  body,
  isPinned,
  showModal,
  setShowModal,
}: Props) => {
  const [modalTitle, setModalTitle] = useState(title);
  const [modalBody, setModalBody] = useState(body);
  const [modalIsPinned, setModalIsPinned] = useState(isPinned);

  const modalRef = useRef(null);

  // remove Note
  const removeNote = async () => {
    toast.error("Note deleted", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3500,
      closeOnClick: true,
    });
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
  };

  // update Note
  const updateNote = async () => {
    toast.info("Note updated", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3500,
      closeOnClick: true,
    });
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc, {
      title: modalTitle,
      body: modalBody,
      isPinned: modalIsPinned,
    });
  };

  // close modal
  const closeModal = (e: MouseEvent) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      updateNote();
    }
  };

  type FormEvent = {
    preventDefault: () => void;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateNote();
    setShowModal(false);
  };

  const handleTitleChange = (e: { target: { value: string } }) => {
    setModalTitle(e.target.value);
  };

  const handleBodyChange = (e: { target: { value: string } }) => {
    setModalBody(e.target.value);
  };

  return (
    <>
      {showModal ? (
        <div className={styles.megaContainer}>
          <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
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
              <div className={styles.toolBar}>
                <div className={styles.toolsWrapper}>
                  {!modalIsPinned ? (
                    <span
                      title="Pin note"
                      className={styles.pinned}
                      onClick={() => {
                        toast.info("Note Pinned", {
                          position: toast.POSITION.BOTTOM_CENTER,
                          autoClose: 3500,
                          closeOnClick: true,
                        });
                        setModalIsPinned(!modalIsPinned);
                      }}
                    >
                      <Pin />
                    </span>
                  ) : (
                    <span
                      title="Pin note"
                      className={styles.unpinned}
                      onClick={() => {
                        toast.info("Note Unpinned", {
                          position: toast.POSITION.BOTTOM_CENTER,
                          autoClose: 3500,
                          closeOnClick: true,
                        });
                        setModalIsPinned(!modalIsPinned);
                      }}
                    >
                      <UnPin />
                    </span>
                  )}
                  <span className={styles.delete} onClick={removeNote}>
                    <Delete />
                  </span>
                </div>
                <button type="submit" className={styles.done}>
                  Done
                </button>
              </div>
            </form>
          </main>
          <div
            ref={modalRef}
            className={styles.overlay}
            onClick={closeModal}
          ></div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;
