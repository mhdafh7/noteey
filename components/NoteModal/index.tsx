"use client";

import styles from "./styles.module.scss";
import { Field, Form, Formik } from "formik";
import { Pin, UnPin } from "../Svgs/Pins";
import { Delete } from "react-feather";
import ReactDOM from "react-dom";
import { useCurrentNoteStore } from "@/store/note";
import { useUpdateNote } from "@/libs/hooks/mutations/note";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";

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

  const updateNoteMutation = useUpdateNote(currentNote.id);

  const handleSubmit = (values: Prisma.NoteUpdateInput) => {
    updateNoteMutation.mutate({
      title: values.title,
      description: values.description,
      isPinned: values.isPinned,
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateNoteMutation.isSuccess) {
      setIsModalOpen(false);
    }
  }, [updateNoteMutation.isSuccess]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <aside className={styles.container}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className={styles.form}>
              <Field
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
              <Field
                type="textarea"
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
                    <button
                      title="Pin note"
                      type="button"
                      className={styles.unpinned}
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "isPinned",
                            value: !values.isPinned, // Toggle the value
                          },
                        });
                      }}
                    >
                      <UnPin />
                    </button>
                  ) : (
                    <button
                      title="Pin note"
                      type="button"
                      className={styles.pinned}
                      onClick={() => {
                        handleChange({
                          target: {
                            name: "isPinned",
                            value: !values.isPinned, // Toggle the value
                          },
                        });
                      }}
                    >
                      <Pin />
                    </button>
                  )}
                  <span className={styles.delete}>
                    <Delete />
                  </span>
                </span>
                <button type="submit" className={styles.done}>
                  Save note
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
