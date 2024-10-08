"use client";
import { useActionState, useEffect, useState } from "react";

import { ErrorBox, H2, Input } from "@/components";
import type { LoginFormState } from "@/features/auth";
import { actionLogin } from "@/features/auth";

const initialState: LoginFormState = {
  ok: true,
};

export const Inputs = () => {
  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);
  const [state, formAction, pending] = useActionState(
    actionLogin,
    initialState,
  );

  useEffect(() => {
    if (state.ok || !state.message) {
      setShouldDisplayMessage(false);
      return;
    }
    setShouldDisplayMessage(true);
    const timer = setTimeout(() => {
      setShouldDisplayMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [state]);

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
            error={!state.ok && !!state.usernameMessage?.length}
            errorText={!state.ok ? state.usernameMessage?.join("\n") : ""}
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
            error={!state.ok && !!state.passwordMessage?.length}
            errorText={!state.ok ? state.passwordMessage?.join("\n") : ""}
            disabled={pending}
          />
        </div>
        {!state.ok && !!state.message && shouldDisplayMessage ? (
          <ErrorBox
            closeFn={() => {
              setShouldDisplayMessage(false);
            }}
          >
            {state.message}
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
