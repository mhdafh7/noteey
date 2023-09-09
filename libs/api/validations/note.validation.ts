import { z } from "zod";

const createNote = z.object({
  title: z.string().max(100).optional(),
  description: z.string().max(1000),
  isPinned: z.boolean(),
});

const NoteValidation = { createNote };
export default NoteValidation;
