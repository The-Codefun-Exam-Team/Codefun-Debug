import { z } from "zod";

export const createProblemSchema = z.object({
  name: z.string().optional(),
  submission_id: z.string(),
});

export type createProblemSchemaType = z.infer<typeof createProblemSchema>;

export interface createProblemResponse {
  status: "OK" | "DUPLICATED" | "FAILED";
  message: string;
  code: string;
}
