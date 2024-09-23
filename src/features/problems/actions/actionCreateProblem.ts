"use server";

import prisma from "@database/prisma/instance";
import { z } from "zod";

import { verifyCodefunWithMemo } from "@/features/auth";
import type { CreateProblemFormState } from "@/features/problems";
import { handleCatch } from "@/utils";

const createProblemSchema = z.object({
  code: z
    .string()
    .max(20, "Code must contain at most 20 letters")
    .min(2, "Code must contain at least 2 letters")
    .includes("D")
    .or(z.literal("")),
  name: z
    .string()
    .max(255, "Name must contain at most 255 letters")
    .or(z.literal("")),
  submissionId: z
    .string()
    .min(1, "Submission ID is required")
    .pipe(z.coerce.number({ message: "Submission ID must be number" })),
});

export type CreateProblemSchemaType = z.infer<typeof createProblemSchema>;

const getSuggestedCode = async () => {
  const prefixPattern = "D";
  const numberPattern = "[0-9]+";

  const maxCodeQuery = await prisma.debugProblemsMaxCode.findFirstOrThrow();
  const maxCode = maxCodeQuery.maxCode;
  const codeNumber = maxCode.match(numberPattern) ?? ["0"];
  const newNumber = parseInt(codeNumber[0], 10) + 1;
  const newCode = `${prefixPattern}${newNumber.toString().padStart(3, "0")}`;
  return newCode;
};

export const actionCreateProblem = async (
  _prevState: CreateProblemFormState,
  formData: FormData,
): Promise<CreateProblemFormState> => {
  try {
    const user = await verifyCodefunWithMemo();
    if (!user.ok || user.data.status !== "Admin") {
      return {
        ok: false,
        message: "You are not authorized to create problems",
        status: 403,
      };
    }

    const validatedBody = await createProblemSchema.spa({
      code: formData.get("code"),
      name: formData.get("name"),
      submissionId: formData.get("submissionId"),
    });

    if (!validatedBody.success) {
      const errors = validatedBody.error.format();
      return {
        ok: false,
        message: "",
        codeMessages: errors.code?._errors,
        nameMessages: errors.name?._errors,
        submissionIdMessages: errors.submissionId?._errors,
        status: 401,
      };
    }

    const { code, name, submissionId } = validatedBody.data;

    const isExistedCode =
      (await prisma.debugProblems.count({
        where: { debugProblemCode: code },
      })) > 0;

    if (isExistedCode) {
      return {
        ok: false,
        message: "",
        codeMessages: ["Code already used"],
        status: 409,
      };
    }

    const submission = await prisma.submissions.findUniqueOrThrow({
      where: {
        id: submissionId,
      },
      select: {
        result: true,
        debugProblems: {
          select: {
            debugProblemCode: true,
          },
        },
      },
    });

    if (submission.debugProblems !== null) {
      return {
        ok: false,
        message: "",
        submissionIdMessages: [
          "Submission already used in problem code " +
            submission.debugProblems.debugProblemCode,
        ],
        status: 409,
      };
    }
    if (submission.result === "AC") {
      return {
        ok: false,
        message: "",
        status: 409,
        submissionIdMessages: ["Accepted submission cannot be used"],
      };
    }
    const newCode = code.length === 0 ? await getSuggestedCode() : code;
    const newName = name.length === 0 ? newCode : name;

    await prisma.debugProblems.create({
      data: {
        debugProblemCode: newCode,
        name: newName,
        subId: submissionId,
      },
    });
    return {
      ok: true,
      data: {
        code: newCode,
        name: newName,
        subId: submissionId,
      },
    };
  } catch (e) {
    return handleCatch(e);
  }
};
