"use client";

import { useActionState, useEffect, useState } from "react";

import { ErrorBox, H2, Input, SuccessBox } from "@/components";
import type { CreateProblemFormState } from "@/features/problems";
import { actionCreateProblem } from "@/features/problems";

const initialState: CreateProblemFormState = {
  ok: true,
  data: {
    code: "",
    name: "",
    subId: 0,
  },
};

export const Inputs = () => {
  const [shouldDisplayError, setShouldDisplayError] = useState(false);
  const [shouldDisplaySuccess, setShouldDisplaySuccess] = useState(false);

  const [state, formAction, pending] = useActionState(
    actionCreateProblem,
    initialState,
  );

  useEffect(() => {
    if (!state.ok && !!state.message) {
      setShouldDisplayError(true);
    }
  }, [state]);

  useEffect(() => {
    if (shouldDisplayError) {
      const timer = setTimeout(() => {
        setShouldDisplayError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [shouldDisplayError]);

  useEffect(() => {
    if (state.ok && !!state.data.code) {
      setShouldDisplaySuccess(true);
    }
  }, [state]);

  useEffect(() => {
    if (shouldDisplaySuccess) {
      const timer = setTimeout(() => {
        setShouldDisplaySuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [shouldDisplaySuccess]);

  return (
    <>
      <div className="text-center">
        <H2>
          <div className="text-accent-light dark:text-accent-dark ">
            Create problem
          </div>
        </H2>
      </div>
      <div className="flex gap-4">
        <div>
          <Input
            id="create-problem-form-code-input"
            label="Code"
            name="code"
            placeholder="(Optional)"
            error={!state.ok && !!state.codeMessages?.length}
            errorTextId="create-problem-form-code-error-text"
            errorText={!state.ok ? state.codeMessages?.join(", ") : ""}
            disabled={pending}
          />
        </div>
        <div>
          <Input
            id="create-problem-form-name-input"
            label="Name"
            name="name"
            placeholder="(Optional)"
            error={!state.ok && !!state.nameMessages?.length}
            errorTextId="create-problem-form-name-error-text"
            errorText={!state.ok ? state.nameMessages?.join(", ") : ""}
            disabled={pending}
          />
        </div>
      </div>
      <div>
        <Input
          id="create-problem-form-submission-id-input"
          label="Submission ID"
          name="submissionId"
          placeholder="Submission ID"
          error={!state.ok && !!state.submissionIdMessages?.length}
          errorTextId="create-problem-form-submission-id-error-text"
          errorText={!state.ok ? state.submissionIdMessages?.join(", ") : ""}
          disabled={pending}
        />
      </div>

      {shouldDisplayError ? (
        <ErrorBox
          closeFn={() => {
            setShouldDisplayError(false);
          }}
        >
          {!state.ok ? state?.message : ""}
        </ErrorBox>
      ) : shouldDisplaySuccess ? (
        <SuccessBox
          closeFn={() => {
            setShouldDisplaySuccess(false);
          }}
        >
          {state.ok
            ? `Problem created successfully using code ${state.data.code}.`
            : ""}
        </SuccessBox>
      ) : (
        <button
          type="submit"
          className="disabled:opacity-7x0 rounded-md border-2 border-slate-600 p-2 text-lg font-medium text-slate-700 transition-opacity dark:border dark:border-slate-400 dark:text-slate-300"
          disabled={pending}
          formAction={formAction}
        >
          {pending ? "Creating problem..." : "Create problem"}
        </button>
      )}
    </>
  );
};
