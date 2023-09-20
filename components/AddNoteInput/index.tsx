"use client";

import { useState, useEffect, useRef, FormEvent, useReducer } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { Pin, UnPin } from "../Svgs/Pins";
import { Prisma } from "@prisma/client";
import NoteMutation from "@/libs/hooks/mutations/note";

import styles from "./styles.module.scss";

const AddNote = () => {
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
    title: "",
    description: "",
    isPinned: false,
  });

  const [showInput, setShowInput] = useState(false);
  const disabled = note.description === "" && note.title === "";

  const formRef = useRef<HTMLFormElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "SET_DESCRIPTION",
      payload: e.target.value,
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_TITLE",
      payload: e.target.value,
    });
  };
  const createNoteMutation = NoteMutation.useCreateNote();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    createNoteMutation.mutate(note);

    // reseting states
    dispatch({ type: "RESET" });
    setShowInput(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const { current: formWrap } = formRef;

      if (formWrap && !formWrap.contains(e.target as Element)) {
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          {showInput ? (
            <div className={styles.titleWrapper}>
              <input
                className={styles.titleInput}
                type="text"
                placeholder="Title"
                value={note.title}
                onChange={handleTitleChange}
                onFocus={() => {
                  setShowInput(true);
                }}
              />
            </div>
          ) : null}
          <ReactTextareaAutosize
            className={styles.bodyInput}
            minRows={2}
            maxRows={10}
            maxLength={1000}
            placeholder="Add a note..."
            value={note.description}
            onChange={handleTextareaChange}
            onFocus={() => {
              setShowInput(true);
            }}
          />
        </div>
        {!disabled && showInput ? (
          <div className={styles.buttonWrapper}>
            {!note.isPinned ? (
              <span
                title="Unpin note"
                className={styles.unpinned}
                onClick={() => {
                  dispatch({ type: "SET_PIN", payload: true });
                }}
              >
                <UnPin />
              </span>
            ) : (
              <span
                title="Pin note"
                className={styles.pinned}
                onClick={() => {
                  dispatch({ type: "SET_PIN", payload: false });
                }}
              >
                <Pin />
              </span>
            )}
            <button
              className={styles.done}
              onFocus={() => setShowInput(true)}
              type="submit"
              tabIndex={0}
              disabled={disabled}
            >
              Done
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
};
export default AddNote;
