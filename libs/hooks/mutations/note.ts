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

export const useUpdateNote = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, Prisma.NoteUpdateInput, null>({
    mutationFn: (note) => NoteRoutes.updateNoteById(id, note),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notes"]);
      toast.success(messages.notes.success.update_note);
    },
  });
};

export const useMoveToTrashNote = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NoteRoutes.moveToTrashNoteById(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notes"]);
      toast.success(messages.notes.success.delete_note);
    },
  });
};

export const useDeleteNote = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NoteRoutes.deleteNoteById(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notes"]);
      toast.success(messages.notes.success.delete_note);
    },
  });
};

export const useEmptyTrash = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NoteRoutes.emptyTrash(),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notes"]);
      toast.success(messages.trash.success.empty_trash);
    },
  });
};
