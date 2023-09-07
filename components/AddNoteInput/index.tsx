"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { Pin, UnPin } from "../Svgs/Pins";

const AddNote = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // create note
  const createNote = async () => {};

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createNote();

    toast.success("Note Created", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3500,
      closeOnClick: true,
    });

    // reseting states
    setInputBody("");
    setInputTitle("");
    setIsPinned(false);
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
                value={inputTitle}
                onChange={(e) => {
                  setInputTitle(e.target.value);
                }}
                onFocus={() => {
                  setShowInput(true);
                }}
              />
            </div>
          ) : null}
          <textarea
            className={styles.bodyInput}
            cols={20}
            rows={2}
            placeholder="Add a note..."
            value={inputBody}
            onChange={(e) => {
              setInputBody(e.target.value);
            }}
            onFocus={() => {
              setShowInput(true);
            }}
          />
        </div>
        {(inputTitle || inputBody) && showInput ? (
          <div className={styles.buttonWrapper}>
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
                title="Pin note"
                className={styles.unpinned}
                onClick={() => {
                  setIsPinned(!isPinned);
                }}
              >
                <UnPin />
              </span>
            )}
            <button
              className={styles.done}
              onFocus={() => setShowInput(true)}
              type="submit"
              tabIndex={0}
              disabled={!inputBody && !inputTitle}
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
