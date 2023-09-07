import { Note } from "@prisma/client";
import { create } from "zustand";

type NoteStore = {
  currentNote: Note;
  isNoteModalOpen: boolean;
  setCurrentNote: (note: Note) => void;
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
    deleted: false,
  },
  setCurrentNote: (note: Note) =>
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
