import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().max(24),
  password: z.string().max(64),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
