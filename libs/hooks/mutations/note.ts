import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Note, Prisma } from "@prisma/client";
import NoteRoutes from "@/libs/api/routes/note.routes";
import { messages } from "@/constants/messages";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, Omit<Prisma.NoteCreateInput, "owner">, null>({
    mutationFn: (note) => NoteRoutes.createNote(note),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notes"]);
      toast.success(messages.notes.success.create_note);
    },
  });
};
