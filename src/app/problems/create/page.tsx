import type { Metadata } from "next";

import { Box } from "@/components";

import { Inputs } from "./Inputs";

export const metadata: Metadata = {
  title: "Create Problem",
};

const Page = () => (
  <div className="flex w-full items-center justify-center self-stretch">
    <Box>
      <form className="flex w-full flex-col gap-6 text-slate-700">
        <Inputs />
      </form>
    </Box>
  </div>
);

export default Page;
