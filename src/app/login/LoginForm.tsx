import { clsx } from "@utils/shared";

import { Box, Heading } from "@/components";

import { Inputs } from "./Inputs";

export const LoginForm = () => {
  return (
    <div className="flex h-full w-full items-center justify-center self-center">
      <Box>
        <form className={clsx("flex w-full flex-col")}>
          <div className="text-center">
            <Heading type="title-large">
              <div className="text-accent-light dark:text-accent-dark">
                Please login to continue
              </div>
            </Heading>
          </div>
          <Inputs />
        </form>
      </Box>
    </div>
  );
};
