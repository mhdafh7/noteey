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

const NoteService = { getNotes, createNote };

export default NoteService;
