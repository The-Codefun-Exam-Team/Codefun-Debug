"use client";
import type { CreateProblemSchemaType } from "@schemas/createProblemSchema";
import { createProblemSchema } from "@schemas/createProblemSchema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Box, Heading, Input } from "@/components";

export const CreateProblemForm = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successStatus, setSuccessStatus] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateProblemSchemaType>({
    resolver: async (data, context, options) => {
      const zodResolver = (await import("@hookform/resolvers/zod")).zodResolver;
      return zodResolver(createProblemSchema)(data, context, options);
    },
  });

  const submitForm = handleSubmit(async (data) => {
    setLoading(true);
    setServerError("");
    setSuccessStatus("");
    const res = await fetch("/api/next/dbg/create_problem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resBody = await res.json();
    if (!res.ok) {
      setServerError(resBody.error);
    } else {
      setSuccessStatus(resBody.message + " - PID: " + resBody.code);
    }
    setLoading(false);
  });

  useEffect(() => {
    const removeErrorTimer = setTimeout(() => setServerError(""), 5000);
    return () => clearTimeout(removeErrorTimer);
  }, [serverError]);

  useEffect(() => {
    const successStatus = setTimeout(() => setSuccessStatus(""), 5000);
    return () => clearTimeout(successStatus);
  }, [successStatus]);

  return (
    <div className="flex w-full items-center justify-center self-stretch">
      <Box>
        <form onSubmit={submitForm} className="flex w-full flex-col gap-6 text-slate-700">
          <div className="text-center">
            <Heading type="title-large">Create Problem</Heading>
            {successStatus && (
              <p className="text-md relative top-4 w-full border-2 border-green-200 bg-green-100 p-1 text-center font-semibold text-green-800">
                Success: {successStatus}
              </p>
            )}
            <div></div>
            {serverError && (
              <p className="text-md relative top-4 w-full border-2 border-red-200 bg-red-100 p-1 text-center font-semibold text-red-800">
                Error: {serverError}. Please try again.
              </p>
            )}
          </div>
          <div>
            <Input
              id="create-problem-form-name-input"
              label="Problem Name"
              placeholder="(Optional)"
              error={!!errors.name}
              errorTextId="create-problem-form-name-error-text"
              errorText={errors.name?.message}
              disabled={loading}
              {...register("name")}
            />
          </div>
          <div>
            <Input
              id="create-problem-form-submission-id-input"
              label="Submission ID"
              placeholder="Submission ID"
              error={!!errors.submissionId}
              errorTextId="create-problem-form-submission-id-error-text"
              errorText={errors.submissionId?.message}
              disabled={loading}
              {...register("submissionId")}
            />
          </div>
          <button
            type="submit"
            className="rounded-md border-2 border-slate-600 p-2 text-lg font-medium text-slate-700 transition-opacity disabled:opacity-50"
            disabled={loading}
          >
            Create
          </button>
        </form>
      </Box>
    </div>
  );
};
