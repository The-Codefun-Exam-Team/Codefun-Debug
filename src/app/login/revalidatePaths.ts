"use server";

import { revalidatePath } from "next/cache";

export const revalidatePaths = () => {
  revalidatePath("/problems/all/[page]", "page");
  revalidatePath("/problems/[pid]", "page");
};
