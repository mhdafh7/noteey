"use client";

import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import { Pin, UnPin } from "../Svgs/Pins";
import { Delete } from "react-feather";
import ReactDOM from "react-dom";
import { useCurrentNoteStore } from "@/store/note";

type Props = {
  setIsModalOpen: (isNoteModalOpen: boolean) => void;
};

const NoteModal = ({ setIsModalOpen }: Props) => {
  const currentNote = useCurrentNoteStore((state) => state.currentNote);
  const initialValues = {
    title: currentNote.title,
    description: currentNote.description,
    isPinned: currentNote.isPinned,
  };

  const handleSubmit = () => {};

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <aside className={styles.container}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title || ""}
                className={styles.title}
                placeholder="Note Title."
                maxLength={50}
              />
              {errors.title && <p>{errors.title}</p>}
              <textarea
                name="description"
                cols={20}
                rows={6}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={styles.description}
                placeholder="Note description..."
                maxLength={500}
              />
              {errors.description && <p>{errors.description}</p>}
              <div className={styles.toolBar}>
                <span className={styles.tools}>
                  {!values.isPinned ? (
                    <button title="Pin note" className={styles.pinned}>
                      <Pin />
                    </button>
                  ) : (
                    <button title="Pin note" className={styles.unpinned}>
                      <UnPin />
                    </button>
                  )}
                  <span className={styles.delete}>
                    <Delete />
                  </span>
                </span>
                <button type="submit" className={styles.done}>
                  Done
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </aside>
    </>,
    document.body
  );
};

export default NoteModal;
