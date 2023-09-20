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

const updateNoteById = async (id: string, note: Prisma.NoteUpdateInput) => {
  const res = await fetch(`/api/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ note }),
  });
  return res.json();
};

const moveToTrashNoteById = async (id: string) => {
  const res = await fetch(`/api/notes/${id}/delete`, {
    method: "PATCH",
  });
  return res.json();
};

const deleteNoteById = async (id: string) => {
  const res = await fetch(`/api/notes/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

const emptyTrash = async () => {
  const res = await fetch(`/api/trash`, {
    method: "DELETE",
  });
  return res.json();
};

const getNotesInTrash = async () => {
  const res = await fetch(`/api/trash`);
  return res.json();
}

const restoreAllNotes = async () => {
  const res = await fetch(`/api/trash`, {
    method: "PATCH",
  });
  return res.json();
}

const restoreNoteFromTrash = async (id: string) => {
  const res = await fetch(`/api/trash/${id}`, {
    method: "PATCH",
  });
  return res.json();
}

const NoteRoutes = {
  getNotes,
  createNote,
  updateNoteById,
  moveToTrashNoteById,
  deleteNoteById,
  emptyTrash,
  getNotesInTrash,
  restoreAllNotes,
  restoreNoteFromTrash,
};

export default NoteRoutes;
