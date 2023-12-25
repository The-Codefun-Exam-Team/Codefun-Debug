"use client";
import { useState } from "react";

import { Box, Heading, Input } from "@/components";

export const CreateProblemForm = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex w-full items-center justify-center self-stretch">
      <Box>
        <form className="flex w-full flex-col gap-6 text-slate-700">
          <div className="text-center">
            <Heading type="title-large">
              <div className="text-accent-light dark:text-accent-dark">Create problem</div>
            </Heading>
            {true && (
              <p className="text-md relative top-4 w-full border-2 border-green-200 bg-green-100 p-1 text-center font-semibold text-green-800">
                Success: {"successStatus"}
              </p>
            )}
            <div></div>
            {true && (
              <p className="text-md relative top-4 w-full border-2 border-red-200 bg-red-100 p-1 text-center font-semibold text-red-800">
                Error: {"serverError"}. Please try again.
              </p>
            )}
          </div>
          <div>
            <Input
              id="create-problem-form-name-input"
              label="Problem Name"
              placeholder="(Optional)"
              error={true}
              errorTextId="create-problem-form-name-error-text"
              errorText={""}
              disabled={loading}
            />
          </div>
          <div>
            <Input
              id="create-problem-form-submission-id-input"
              label="Submission ID"
              placeholder="Submission ID"
              error={true}
              errorTextId="create-problem-form-submission-id-error-text"
              errorText={""}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="disabled:opacity-7x0 rounded-md border-2 border-slate-600 p-2 text-lg font-medium text-slate-700 transition-opacity dark:border-[1px] dark:border-slate-400 dark:text-slate-300"
            disabled={loading}
          >
            Create
          </button>
        </form>
      </Box>
    </div>
  );
};
