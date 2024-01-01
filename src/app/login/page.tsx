import type { Metadata } from "next";
import { Suspense } from "react";

import { Box, Heading } from "@/components";

import { Inputs } from "./Inputs";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => (
  <div className="flex h-full w-full items-center justify-center self-center">
    <Box>
      <form className="flex w-full flex-col">
        <div className="text-center">
          <Heading type="title-large">
            <div className="text-accent-light dark:text-accent-dark">Please login to continue</div>
          </Heading>
        </div>
        <Suspense>
          <Inputs />
        </Suspense>
      </form>
    </Box>
  </div>
);

export default Page;
