import { ZodObject } from "zod";
import { generateErrorMessage, ErrorMessageOptions } from "zod-error";

const options: ErrorMessageOptions = {
  delimiter: {
    error: " ❌ ",
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};

const zodeError = (schema: ZodObject<any>, data: any) => {
  const result = schema.safeParse(data);
  if (result.success) return null;
  const errorMessage = generateErrorMessage(result.error.issues, options);
  return errorMessage;
};

export default zodeError;
