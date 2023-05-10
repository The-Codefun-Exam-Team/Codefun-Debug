import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export interface UserData {
  id: number;
  username: string;
  name: string;
  group: {
    id: number;
    name: string;
  };
  status: string;
  avatar: string;
  score: number;
  solved: number;
  ratio: number;
  email: string;
}
