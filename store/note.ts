import { Note } from "@prisma/client";
import { create } from "zustand";

type NoteStore = {
  currentNote: Omit<Note, "deleted">;
  isNoteModalOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setCurrentNote: (note: Omit<Note, "deleted">) => void;
  resetCurrentNote: () => void;
  // eslint-disable-next-line no-unused-vars
  setIsNoteModalOpen: (isNoteModalOpen: boolean) => void;
  isConfirmMoveToTrashDialogOpen: boolean;
  setIsConfirmMoveToTrashDialogOpen: (
    // eslint-disable-next-line no-unused-vars
    isConfirmMoveToTrashDialogOpen: boolean
  ) => void;
  isConfirmEmptyTrashDialogOpen: boolean;
  setIsConfirmEmptyTrashDialogOpen: (
    // eslint-disable-next-line no-unused-vars
    isConfirmEmptyTrashDialogOpen: boolean
  ) => void;
};

export const useCurrentNoteStore = create<NoteStore>((set) => ({
  currentNote: {
    id: "",
    title: "",
    description: "",
    isPinned: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: "",
  },
  setCurrentNote: (note: Omit<Note, "deleted">) =>
    set((state) => ({
      ...state,
      currentNote: note,
    })),
  resetCurrentNote: () =>
    set((state) => ({
      ...state,
      currentNote: {
        id: "",
        title: "",
        description: "",
        isPinned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: "",
      },
    })),
  isNoteModalOpen: false,
  setIsNoteModalOpen: (isNoteModalOpen: boolean) =>
    set((state) => ({
      ...state,
      isNoteModalOpen,
    })),
  isConfirmMoveToTrashDialogOpen: false,
  setIsConfirmMoveToTrashDialogOpen: (
    isConfirmMoveToTrashDialogOpen: boolean
  ) =>
    set((state) => ({
      ...state,
      isConfirmMoveToTrashDialogOpen,
    })),
  isConfirmEmptyTrashDialogOpen: false,
  setIsConfirmEmptyTrashDialogOpen: (isConfirmEmptyTrashDialogOpen: boolean) =>
    set((state) => ({
      ...state,
      isConfirmEmptyTrashDialogOpen,
    })),
}));
