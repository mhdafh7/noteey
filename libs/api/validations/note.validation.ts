import { z } from "zod";

const createNote = z.object({
  title: z.string().max(100).optional(),
  description: z.string().max(1000),
  isPinned: z.boolean(),
});

const updateNote = z.object({
  title: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  isPinned: z.boolean().optional(),
});

const NoteValidation = { createNote, updateNote };
export default NoteValidation;
