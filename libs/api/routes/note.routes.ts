import { Prisma } from "@prisma/client";

const getNotes = async () => {
  const res = await fetch(`/api/note`);
  return res.json();
};

const createNote = async (note: Prisma.NoteCreateInput) => {
  const res = await fetch(`/api/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return res.json();
};

const NoteRoutes = { getNotes, createNote };

export default NoteRoutes;
