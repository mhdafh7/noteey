import { useQuery } from "@tanstack/react-query";

import { Note } from "@prisma/client";

import NoteRoutes from "../../api/routes/note.routes";

const useGetNotes = () => {
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: NoteRoutes.getNotes,
  });
};

const useGetNotesInTrash = () => {
  return useQuery<Note[]>({
    queryKey: ["notesInTrash"],
    queryFn: NoteRoutes.getNotesInTrash,
  });
};

const NoteQueries = {
  useGetNotes,
  useGetNotesInTrash,
};

export default NoteQueries;
