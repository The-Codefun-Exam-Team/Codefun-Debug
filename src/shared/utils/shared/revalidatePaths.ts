"use server";

import { revalidatePath } from "next/cache";

export const revalidatePaths = () => {
  revalidatePath("/problems/all/[page]");
  revalidatePath("/problems/[pid]");
};
