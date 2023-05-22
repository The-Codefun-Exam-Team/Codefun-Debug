import { z } from 'zod';

export const submitSchema = z.object({
	problem: z.string().startsWith("D"),
	code: z.string(),
})

export type SubmitSchemaType = z.infer<typeof submitSchema>;

export interface submitData {
	id: number;
}