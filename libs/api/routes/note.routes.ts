import { Prisma } from "@prisma/client";

const getNotes = async () => {
  const res = await fetch(`/api/notes`);
  return res.json();
};

const createNote = async (note: Omit<Prisma.NoteCreateInput, "owner">) => {
  const res = await fetch(`/api/notes`, {
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
