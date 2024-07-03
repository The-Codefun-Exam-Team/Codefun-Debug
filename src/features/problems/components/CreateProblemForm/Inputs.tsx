"use client";

import { useActionState, useEffect, useState } from "react";

import { ErrorBox, H2, Input, SuccessBox } from "@/components";
import type { CreateProblemFormState } from "@/features/problems";
import { actionCreateProblem } from "@/features/problems";
import { useAppDispatch } from "@/hooks";

const initialState: CreateProblemFormState = {
  codeMessages: [],
  nameMessages: [],
  submissionIdMessages: [],
  errorMessages: [],
  successMessages: [],
};

export const Inputs = () => {
  const dispatch = useAppDispatch();
  const [state, formAction, pending] = useActionState(
    actionCreateProblem,
    initialState,
  );
  const [displayState, setDisplayState] = useState(initialState);

  useEffect(() => {
    setDisplayState(state);
  }, [state, dispatch]);

  useEffect(() => {
    if (displayState !== initialState) {
      const timeout = setTimeout(() => {
        setDisplayState(initialState);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [displayState]);

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
            error={
              !!displayState.codeMessages?.length &&
              displayState.codeMessages.length > 0
            }
            errorTextId="create-problem-form-code-error-text"
            errorText={displayState.codeMessages?.join(", ")}
            disabled={pending}
          />
        </div>
        <div>
          <Input
            id="create-problem-form-name-input"
            label="Name"
            name="name"
            placeholder="(Optional)"
            error={
              !!displayState.nameMessages?.length &&
              displayState.nameMessages.length > 0
            }
            errorTextId="create-problem-form-name-error-text"
            errorText={displayState.nameMessages?.join(", ")}
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
          error={
            !!displayState.submissionIdMessages?.length &&
            displayState.submissionIdMessages.length > 0
          }
          errorTextId="create-problem-form-submission-id-error-text"
          errorText={displayState.submissionIdMessages?.join(", ")}
          disabled={pending}
        />
      </div>

      {!!displayState.errorMessages && displayState.errorMessages.length > 0 ? (
        <ErrorBox
          closeFn={() => {
            setDisplayState({ ...displayState, errorMessages: [] });
          }}
        >
          {displayState.errorMessages.join(", ")}
        </ErrorBox>
      ) : displayState.successMessages &&
        displayState.successMessages.length > 0 ? (
        <SuccessBox
          closeFn={() => {
            setDisplayState({ ...displayState, successMessages: [] });
          }}
        >
          {displayState.successMessages.join(", ")}
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
