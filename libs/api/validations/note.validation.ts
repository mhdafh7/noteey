import { z } from "zod";

const createNote = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  isPinned: z.boolean(),
});

const NoteValidation = { createNote };
export default NoteValidation;
