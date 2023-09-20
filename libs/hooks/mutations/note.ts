import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Note, Prisma } from "@prisma/client";
import NoteRoutes from "@/libs/api/routes/note.routes";
import { messages } from "@/constants/messages";

const useCreateNote = () => {
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

const useUpdateNote = (id: string) => {
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

const useMoveToTrashNote = (id: string) => {
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

const useDeleteNote = (id: string) => {
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

const useEmptyTrash = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NoteRoutes.emptyTrash(),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notesInTrash"]);
      toast.success(messages.trash.success.empty_trash);
    },
  });
};

const useRestoreAllNotes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NoteRoutes.restoreAllNotes(),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notesInTrash"]);
      queryClient.invalidateQueries(["notes"]);
      toast.success(messages.trash.success.restore_all_notes);
    },
  });
};

const useRestoreNote = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NoteRoutes.restoreNoteFromTrash(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notesInTrash"]);
      queryClient.invalidateQueries(["notes"]);
      toast.success(messages.trash.success.restore_note);
    },
  });
};

const useDeleteNoteFromTrash = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NoteRoutes.deleteNoteFromTrash(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["notesInTrash"]);
      toast.success(messages.notes.success.delete_note);
    },
  });
};

const NoteMutation = {
  useCreateNote,
  useUpdateNote,
  useMoveToTrashNote,
  useDeleteNote,
  useEmptyTrash,
  useRestoreAllNotes,
  useRestoreNote,
  useDeleteNoteFromTrash,
};

export default NoteMutation;
