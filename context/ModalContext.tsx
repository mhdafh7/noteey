"use client";

import { Note } from "@/types";
import {
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  Dispatch,
} from "react";

type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalData: Note;
  setModalData: Dispatch<SetStateAction<Note>>;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalData: {
    id: "",
    body: "",
    title: "",
    isPinned: false,
  },
  setModalData: () => {},
});

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [modalData, setModalData] = useState({
    id: "",
    body: "",
    title: "",
    isPinned: false,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setModalData({
      id: "",
      body: "",
      title: "",
      isPinned: false,
    });
    setIsOpen(false);
  };
  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalData, setModalData }}
    >
      {children}
    </ModalContext.Provider>
  );
};
