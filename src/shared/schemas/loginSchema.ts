import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
