import { z } from "zod";

export const getProblemSchema = z.object({
	id: z.number().int(),
})

