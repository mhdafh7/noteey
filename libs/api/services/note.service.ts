import { messages } from "@/constants/messages";
import { prisma } from "@/libs/db";
import { Prisma } from "@prisma/client";

const getNotes = async (userId: string) => {
  return await prisma.note.findMany({
    where: {
      ownerId: userId,
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

const NoteService = {
  getNotes,
  getNoteById,
  createNote,
  updateNoteById,
  flagDeleteNoteById,
  deleteNoteById,
};

export default NoteService;
