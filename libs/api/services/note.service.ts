import { messages } from "@/constants/messages";
import { prisma } from "@/libs/db";
import { Prisma } from "@prisma/client";

const getNotes = async (userId: string) => {
  return await prisma.note.findMany({
    where: {
      ownerId: userId,
      deleted: false,
    },
    orderBy: {
      createdAt: Prisma.SortOrder.desc,
    },
  });
};

const getNoteById = async (id: string) => {
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });

  if (!note) {
    throw new Error(messages.notes.errors.get_notes);
  }

  return note;
};

const createNote = async (
  note: Omit<Prisma.NoteCreateInput, "owner">,
  userId: string
) => {
  return await prisma.note.create({
    data: {
      ...note,
      owner: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const updateNoteById = async (
  id: string,
  title?: string,
  description?: string,
  isPinned?: boolean
) => {
  return await prisma.note.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      isPinned,
    },
  });
};

const flagDeleteNoteById = async (id: string) => {
  const note = await prisma.note.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    },
  });

  if (!note) {
    throw new Error(messages.notes.errors.delete_note);
  }

  return note;
};

const deleteNoteById = async (id: string) => {
  const note = await prisma.note.delete({
    where: {
      id,
    },
  });

  if (!note) {
    throw new Error(messages.notes.errors.delete_note);
  }

  return note;
};

const getNotesInTrash = async (userId: string) => {
  return await prisma.note.findMany({
    where: {
      ownerId: userId,
      deleted: true,
    },
    orderBy: {
      createdAt: Prisma.SortOrder.desc,
    },
  });
};

const emptyTrash = async (userId: string) => {
  return await prisma.note.deleteMany({
    where: {
      ownerId: userId,
      deleted: true,
    },
  });
};

const restoreAllNotes = async (userId: string) => {
  return await prisma.note.updateMany({
    where: {
      ownerId: userId,
      deleted: true,
    },
    data: {
      deleted: false,
    },
  });
};

const restoreNoteFromTrash = async (id: string) => {
  return await prisma.note.update({
    where: {
      id,
    },
    data: {
      deleted: false,
    },
  });
};

const deleteNoteFromTrash = async (id: string) => {
  return await prisma.note.delete({
    where: {
      id,
    },
  });
};

const NoteService = {
  getNotes,
  getNoteById,
  createNote,
  updateNoteById,
  flagDeleteNoteById,
  deleteNoteById,
  getNotesInTrash,
  emptyTrash,
  restoreAllNotes,
  restoreNoteFromTrash,
  deleteNoteFromTrash,
};

export default NoteService;
