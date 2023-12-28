import { z } from "zod";

export const createProblemSchema = z.object({
  code: z.string().max(20, "Code must contain at most 20 letters").optional(),
  name: z.string().max(255, "Name must contain at most 255 letters").optional(),
  rid: z.number(),
});

export type CreateProblemSchemaType = z.infer<typeof createProblemSchema>;

export interface CreateProblemResponse {
  status: "OK" | "DUPLICATED" | "FAILED";
  message: string;
  code: string;
}
