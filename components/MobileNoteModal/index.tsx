"use client";

import { useState } from "react";
import { Pin, UnPin } from "../Svgs/Pins";

import { ArrowLeft } from "react-feather";
import Delete from "../Svgs/Delete";
import { useCurrentNoteStore } from "@/store/note";

import styles from "./styles.module.scss";

type FormEvent = {
  preventDefault: () => void;
};
type inputChange = {
  target: { value: string };
};

const MobileNoteModal = ({ isEdit = false }) => {
  const currentNote = useCurrentNoteStore((state) => state.currentNote);
  const setIsModalOpen = useCurrentNoteStore(
    (state) => state.setIsNoteModalOpen
  );

  const [isPinned, setIsPinned] = useState(currentNote.isPinned);
  const [modalTitle, setModalTitle] = useState(currentNote.title);
  const [modalDescription, setModalDescription] = useState(
    currentNote.description
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleTitleChange = (e: inputChange) => {
    setModalTitle(e.target.value);
  };

  const handleBodyChange = (e: inputChange) => {
    setModalDescription(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            value={modalTitle || ""}
          />
          <textarea
            className={styles.body}
            cols={20}
            rows={6}
            placeholder="note it here..."
            onChange={handleBodyChange}
            value={modalDescription}
          />
        </section>
        <button
          type="submit"
          disabled={modalDescription === "" && modalTitle === ""}
        >
          Save note
        </button>
      </form>
    </div>
  );
};
export default MobileNoteModal;
