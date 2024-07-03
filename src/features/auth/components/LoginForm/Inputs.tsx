"use client";
import { useActionState, useEffect, useState } from "react";

import { ErrorBox, H2, Input } from "@/components";
import type { LoginFormState } from "@/features/auth";
import { actionLogin } from "@/features/auth";
import { useAppDispatch } from "@/hooks";

const initialState: LoginFormState = {
  user: null,
  username_messages: [],
  password_messages: [],
  messages: [],
};

export const Inputs = () => {
  const dispatch = useAppDispatch();
  const [state, formAction, pending] = useActionState(
    actionLogin,
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

  const clearMessage = () => {
    setDisplayState({ ...displayState, messages: [] });
  };
  return (
    <form action={formAction} className="flex w-full flex-col">
      <div className="text-center">
        <div className="text-accent-light dark:text-accent-dark">
          <H2>Please login to continue</H2>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div>
          <Input
            id="login-form-username-input"
            name="username"
            label="Username"
            placeholder="Username"
            errorTextId="login-form-username-error-text"
            error={displayState.username_messages.length > 0}
            errorText={displayState.username_messages.join("\n")}
            disabled={pending}
          />
        </div>
        <div>
          <Input
            id="login-form-password-input"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            errorTextId="login-form-password-error-text"
            error={displayState.password_messages.length > 0}
            errorText={displayState.password_messages.join("\n")}
            disabled={pending}
          />
        </div>
        {displayState.messages.length > 0 ? (
          <ErrorBox closeFn={clearMessage}>
            {displayState.messages.join("\n")}
          </ErrorBox>
        ) : (
          <button
            type="submit"
            disabled={pending}
            className="rounded-md border-2 border-slate-600 p-2 text-lg font-medium text-slate-700 transition-opacity disabled:opacity-70 dark:border dark:border-slate-400 dark:text-slate-300"
          >
            {pending ? "Signing in" : "Sign in"}
          </button>
        )}
      </div>
    </form>
  );
};
