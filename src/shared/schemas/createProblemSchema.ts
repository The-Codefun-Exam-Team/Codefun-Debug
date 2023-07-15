import { z } from "zod";

export const createProblemSchema = z.object({
  name: z.string().optional(),
  submissionId: z.string(),
});

export type CreateProblemSchemaType = z.infer<typeof createProblemSchema>;

export interface CreateProblemResponse {
  status: "OK" | "DUPLICATED" | "FAILED";
  message: string;
  code: string;
}
