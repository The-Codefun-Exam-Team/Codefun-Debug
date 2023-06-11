"use client";
import { useAppDispatch } from "@redux/hooks";
import { setUser } from "@redux/slice";
import { loginSchema, type LoginSchemaType } from "@schemas/loginSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: async (data, context, options) => {
      const zodResolver = (await import("@hookform/resolvers/zod")).zodResolver;
      return zodResolver(loginSchema)(data, context, options);
    },
  });
  const submitForm = handleSubmit(async (data) => {
    const res = await fetch("/beta/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resBody = await res.json();
    if (res.ok) {
      dispatch(setUser(resBody));
      router.push(searchParams?.get("prev") || "/");
    } else {
      setServerError(resBody.error);
    }
  });
  useEffect(() => {
    const removeErrorTimer = setTimeout(() => setServerError(""), 5000);
    return () => clearTimeout(removeErrorTimer);
  }, [serverError]);
  return (
    <div className="flex h-full w-full items-center justify-center self-center">
      <form
        onSubmit={submitForm}
        className="flex w-[90vw] max-w-[500px] flex-col justify-center gap-6 border-2 border-solid border-slate-600 p-10 text-slate-700"
      >
        <div className="text-center text-2xl font-semibold">Please login to continue</div>
        {serverError && (
          <p className="text-md w-full border-2 border-red-200 bg-red-100 p-1 text-center font-semibold text-red-800">
            Error: {serverError}. Please try again.
          </p>
        )}
        <div>
          <label
            htmlFor="login-form-username-input"
            id="login-form-username-input-label"
            className="block text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            className="w-full border-2 border-slate-600 p-2.5 text-lg"
            placeholder="Username"
            id="login-form-username-input"
            aria-invalid={!!errors.username}
            aria-describedby="login-form-username-error-text"
            {...register("username")}
          />
          {errors?.username?.message && (
            <p className="text-red-500" id="login-form-username-error-text">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="login-form-password-input"
            id="login-form-password-input-label"
            className="block text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full border-2 border-slate-600 p-2.5 text-lg"
            placeholder="Password"
            id="login-form-password-input"
            aria-invalid={!!errors.password}
            aria-describedby="login-form-password-error-text"
            {...register("password")}
          />
          {errors?.password?.message && (
            <p className="text-red-500" id="login-form-password-error-text">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="border-2 border-slate-600 p-2 text-lg font-medium text-slate-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};
