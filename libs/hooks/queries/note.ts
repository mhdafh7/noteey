import { useQuery } from "@tanstack/react-query";

import { Note } from "@prisma/client";

import NoteRoutes from "../../api/routes/note.routes";

export const useGetNotes = () => {
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: NoteRoutes.getNotes,
  });
};


