"use client";

import { useEffect, useReducer } from "react";

import { ArrowLeft } from "react-feather";

import { Pin, UnPin } from "../Svgs/Pins";
import { Prisma } from "@prisma/client";
import Delete from "../Svgs/Delete";
import { useCurrentNoteStore } from "@/store/note";

import styles from "./styles.module.scss";
import {
  useCreateNote,
  useUpdateNote,
} from "@/libs/hooks/mutations/note";
import { messages } from "@/constants/messages";

type FormEvent = {
  preventDefault: () => void;
};
type inputChange = {
  target: { value: string };
};

const MobileNoteModal = () => {
  const currentNote = useCurrentNoteStore((state) => state.currentNote);
  const resetCurrentNote = useCurrentNoteStore(
    (state) => state.resetCurrentNote
  );
  const setIsModalOpen = useCurrentNoteStore(
    (state) => state.setIsNoteModalOpen
  );

  const setIsConfirmMoveToTrashDialogOpen = useCurrentNoteStore(
    (state) => state.setIsConfirmMoveToTrashDialogOpen
  );

  const reducer = (
    state: Omit<Prisma.NoteCreateInput, "owner">,
    action: any
  ) => {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_DESCRIPTION":
        return { ...state, description: action.payload };
      case "SET_PIN":
        return { ...state, isPinned: action.payload };
      case "RESET":
        return {
          title: "",
          description: "",
          isPinned: false,
        };
      default:
        return state;
    }
  };

  const [note, dispatch] = useReducer(reducer, {
    title: currentNote.title || "",
    description: currentNote.description || "",
    isPinned: currentNote.isPinned || false,
  });

  const isEdit = currentNote.id && currentNote.id !== "" ? true : false;

  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote(currentNote.id || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      updateNoteMutation.mutate(note);
    } else createNoteMutation.mutate(note);
  };

  const handleTitleChange = (e: inputChange) => {
    dispatch({ type: "SET_TITLE", payload: e.target.value });
  };

  const handleBodyChange = (e: inputChange) => {
    dispatch({ type: "SET_DESCRIPTION", payload: e.target.value });
  };

  const handleMoveToTrash = () => {
    setIsConfirmMoveToTrashDialogOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetCurrentNote();
  };

  useEffect(() => {
    if (createNoteMutation.isSuccess || updateNoteMutation.isSuccess) {
      resetCurrentNote();
      closeModal();
    }
    if (createNoteMutation.isSuccess)
      console.log(messages.notes.success.create_note);
    if (updateNoteMutation.isSuccess)
      console.log(messages.notes.success.update_note);
  }, [createNoteMutation.isSuccess, updateNoteMutation.isSuccess]);

  return (
    <div className={styles.container}>
      <nav className={styles.topBar}>
        <button className={styles.back} onClick={closeModal}>
          <ArrowLeft size={32} />
        </button>

        <div className={styles.actions}>
          {!note.isPinned ? (
            <button
              title="Pin note"
              className={styles.unpinned}
              onClick={() => {
                dispatch({ type: "SET_PIN", payload: true });
              }}
            >
              <UnPin />
            </button>
          ) : (
            <button
              title="Unpin note"
              className={styles.pinned}
              onClick={() => {
                dispatch({ type: "SET_PIN", payload: false });
              }}
            >
              <Pin />
            </button>
          )}
          {isEdit ? (
            <button className={styles.delete} onClick={handleMoveToTrash}>
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
            value={note.title}
          />
          <textarea
            className={styles.body}
            cols={20}
            rows={6}
            placeholder="note it here..."
            onChange={handleBodyChange}
            value={note.description}
          />
        </section>
        <button type="submit" disabled={note.description === ""}>
          {createNoteMutation.isLoading ? "Loading..." : "Save note"}
        </button>
      </form>
    </div>
  );
};
export default MobileNoteModal;
