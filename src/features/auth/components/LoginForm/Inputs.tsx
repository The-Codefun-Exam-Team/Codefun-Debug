"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { actionLogin } from "@/actions";
import { ErrorBox, Input } from "@/components";
import type { LoginFormState } from "@/features/auth";
import { useAppDispatch } from "@/hooks";
import { setUser } from "@/store/redux";

const initialState: LoginFormState = {
  user: null,
  username_messages: [],
  password_messages: [],
  messages: [],
};

export const Inputs = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(actionLogin, initialState);
  const [displayState, setDisplayState] = useState(initialState);

  useEffect(() => {
    if (state.user) {
      const redirectTo = params.get("prev") || "/";
      dispatch(setUser({ user: state.user }));
      router.push(redirectTo);
    }
  }, [state.user, router, params, dispatch]);

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
        <ErrorBox closeFn={clearMessage}>{displayState.messages.join("\n")}</ErrorBox>
      ) : (
        <button
          type="submit"
          formAction={formAction}
          disabled={pending}
          className="rounded-md border-2 border-slate-600 p-2 text-lg font-medium text-slate-700 transition-opacity disabled:opacity-70 dark:border-[1px] dark:border-slate-400 dark:text-slate-300"
        >
          {pending ? "Signing in" : "Sign in"}
        </button>
      )}
    </div>
  );
};
