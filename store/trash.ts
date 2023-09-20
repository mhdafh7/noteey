/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { Note } from "@prisma/client";

type TrashStore = {
  isTrashNoteModalOpen: boolean;
  setIsTrashNoteModalOpen: (isTrashNoteModalOpen: boolean) => void;
  currentTrashNote: Note;
  setCurrentTrashNote: (note: Note) => void;
  isConfirmEmptyTrashDialogOpen: boolean;
  setIsConfirmEmptyTrashDialogOpen: (
    isConfirmEmptyTrashDialogOpen: boolean
  ) => void;
};

export const useTrashStore = create<TrashStore>((set) => ({
  isTrashNoteModalOpen: false,
  setIsTrashNoteModalOpen: (isTrashNoteModalOpen: boolean) =>
    set((state) => ({
      ...state,
      isTrashNoteModalOpen,
    })),
  currentTrashNote: {
    id: "",
    title: "",
    description: "",
    isPinned: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: "",
    deleted: true,
  },
  setCurrentTrashNote: (note: Note) =>
    set((state) => ({
      ...state,
      currentTrashNote: note,
    })),
  isConfirmEmptyTrashDialogOpen: false,
  setIsConfirmEmptyTrashDialogOpen: (isConfirmEmptyTrashDialogOpen: boolean) =>
    set((state) => ({
      ...state,
      isConfirmEmptyTrashDialogOpen,
    })),
}));
