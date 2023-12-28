"use client";

import { useAppDispatch } from "@redux/hooks";
import { createProblem } from "@utils/actions";
import type { CreateProblemFormState } from "@utils/actions/createProblem";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { ErrorBox, Heading, Input, SuccessBox } from "@/components";

const initialState: CreateProblemFormState = {
  code_messages: [],
  name_messages: [],
  rid_messages: [],
  messages: [],
  success_messages: [],
};

export const Inputs = () => {
  const dispatch = useAppDispatch();
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createProblem, initialState);
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
        <Heading type="title-large">
          <div className="text-accent-light dark:text-accent-dark ">Create problem</div>
        </Heading>
      </div>
      <div className="flex gap-4">
        <div>
          <Input
            id="create-problem-form-code-input"
            label="Code"
            name="code"
            placeholder="(Optional)"
            error={true}
            errorTextId="create-problem-form-code-error-text"
            errorText={displayState.code_messages.join("\n")}
            disabled={pending}
          />
        </div>
        <div>
          <Input
            id="create-problem-form-name-input"
            label="Name"
            name="name"
            placeholder="(Optional)"
            error={true}
            errorTextId="create-problem-form-name-error-text"
            errorText={displayState.name_messages.join("\n")}
            disabled={pending}
          />
        </div>
      </div>
      <div>
        <Input
          id="create-problem-form-submission-id-input"
          label="Submission ID"
          name="rid"
          placeholder="Submission ID"
          error={true}
          errorTextId="create-problem-form-submission-id-error-text"
          errorText={displayState.rid_messages.join("\n")}
          disabled={pending}
        />
      </div>

      {displayState.messages.length > 0 ? (
        <ErrorBox
          closeFn={() => {
            setDisplayState({ ...displayState, messages: [] });
          }}
        >
          {displayState.messages.join("\n")}
        </ErrorBox>
      ) : displayState.success_messages.length > 0 ? (
        <SuccessBox
          closeFn={() => {
            setDisplayState({ ...displayState, success_messages: [] });
          }}
        >
          {displayState.success_messages.join("\n")}
        </SuccessBox>
      ) : (
        <button
          type="submit"
          className="disabled:opacity-7x0 rounded-md border-2 border-slate-600 p-2 text-lg font-medium text-slate-700 transition-opacity dark:border-[1px] dark:border-slate-400 dark:text-slate-300"
          disabled={pending}
          formAction={formAction}
        >
          {pending ? "Creating problem..." : "Create problem"}
        </button>
      )}
    </>
  );
};
