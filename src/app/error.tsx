"use client";

import { Heading } from "@/components";

const ErrorComponent = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <div className="flex w-full flex-col items-center justify-center self-stretch">
    <div className="flex w-[90vw] max-w-[500px] flex-col gap-3">
      <Heading type="title-large">{":("}</Heading>
      <Heading type="display">Something went wrong!</Heading>
      <Heading type="title-large"> Error: {error.message}</Heading>
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
