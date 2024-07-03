"use client";

import { H1, H2 } from "@/components";

const ErrorComponent = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <div className="flex w-full flex-col items-center justify-center self-stretch">
    <div className="flex w-[90vw] max-w-[500px] flex-col gap-3">
      <H2>{":("}</H2>
      <H1>Something went wrong!</H1>
      <H2> Error: {error.message}</H2>
      <button
        className="w-fit rounded-md bg-accent-light px-4 py-2 text-white dark:bg-accent-dark dark:text-black"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  </div>
);

export default ErrorComponent;
