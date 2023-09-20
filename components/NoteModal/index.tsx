"use client";

import { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import ReactDOM from "react-dom";
import { Trash2 } from "react-feather";
import { Prisma } from "@prisma/client";
import { useCurrentNoteStore } from "@/store/note";
import NoteMutation from "@/libs/hooks/mutations/note";
import { Pin, UnPin } from "../Svgs/Pins";
import ResizingTextarea from "../ResizingTextarea";
import RoundSpinner from "../Loaders/RoundSpinner";

import styles from "./styles.module.scss";

type Props = {
  setIsModalOpen: (isNoteModalOpen: boolean) => void;
};

const NoteModal = ({ setIsModalOpen }: Props) => {
  const currentNote = useCurrentNoteStore((state) => state.currentNote);

  const setIsConfirmMoveToTrashDialogOpen = useCurrentNoteStore(
    (state) => state.setIsConfirmMoveToTrashDialogOpen
  );

  const handleMoveToTrash = () => {
    setIsConfirmMoveToTrashDialogOpen(true);
  };

  const initialValues = {
    title: currentNote.title,
    description: currentNote.description,
    isPinned: currentNote.isPinned,
  };

  const updateNoteMutation = NoteMutation.useUpdateNote(currentNote.id);

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
                autoComplete="off"
              />
              {errors.title && <p>{errors.title}</p>}
              <ResizingTextarea
                name="description"
                styles={styles.description}
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
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
                  <button
                    className={styles.delete}
                    type="button"
                    onClick={handleMoveToTrash}
                  >
                    <Trash2 />
                  </button>
                </span>
                <button type="submit" className={styles.done}>
                  {updateNoteMutation.isLoading ? (
                    <RoundSpinner scale={0.4} />
                  ) : (
                    "Save note"
                  )}
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
