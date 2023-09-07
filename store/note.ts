import { Note } from "@prisma/client";
import { create } from "zustand";

type NoteStore = {
  currentNote: Omit<Note, "deleted">;
  isNoteModalOpen: boolean;
  setCurrentNote: (note: Omit<Note, "deleted">) => void;
  setIsNoteModalOpen: (isNoteModalOpen: boolean) => void;
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
  isNoteModalOpen: false,
  setIsNoteModalOpen: (isNoteModalOpen: boolean) =>
    set((state) => ({
      ...state,
      isNoteModalOpen,
    })),
}));
