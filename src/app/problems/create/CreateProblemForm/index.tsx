import { Box } from "@/components";

import { Inputs } from "./Inputs";

export const CreateProblemForm = () => (
  <Box>
    <form className="flex w-full flex-col gap-6 text-slate-700">
      <Inputs />
    </form>
  </Box>
);
