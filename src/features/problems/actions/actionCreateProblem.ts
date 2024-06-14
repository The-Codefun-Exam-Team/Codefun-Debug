"use server";

import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";

import { verifyCodefun } from "@/features/auth";

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

export interface CreateProblemResponse {
  status: "OK" | "DUPLICATED" | "FAILED";
  message: string;
  code: string;
}

export interface CreateProblemFormState {
  codeMessages?: string[];
  nameMessages?: string[];
  submissionIdMessages?: string[];
  errorMessages?: string[];
  successMessages?: string[];
}

const validateInput = async ({
  code,
  name,
  submissionId,
}: {
  code: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  submissionId: FormDataEntryValue | null;
}): Promise<
  | { ok: true; data: CreateProblemSchemaType }
  | { ok: false; error: CreateProblemFormState }
> => {
  const validatedBody = await createProblemSchema.spa({
    code,
    name,
    submissionId,
  });
  if (!validatedBody.success) {
    const errors = validatedBody.error.format();
    return {
      ok: false,
      error: {
        codeMessages: errors.code?._errors,
        nameMessages: errors.name?._errors,
        submissionIdMessages: errors.submissionId?._errors,
        errorMessages: errors._errors,
      },
    };
  }
  return {
    ok: true,
    data: validatedBody.data,
  };
};

const getSuggestedCode = async () => {
  const prefixPattern = "D";
  const numberPattern = "[0-9]+";
  const suffixPattern = "";
  const codePattern = `${prefixPattern}${numberPattern}${suffixPattern}`;

  const maxCodeQuery = await prisma.$queryRaw<{ max_code: string }[]>`
    SELECT MAX(debug_problem_code) as max_code FROM debug_problems 
    WHERE debug_problem_code SIMILAR TO ${codePattern}`;
  const maxCode = maxCodeQuery[0]["max_code"] ?? "0";
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
    const user = await verifyCodefun();
    const isAdmin = user.ok && user.data.status === "Admin";
    if (!isAdmin) {
      return {
        errorMessages: ["You are not authorized to create problems"],
      };
    }

    const validatedBody = await validateInput({
      code: formData.get("code"),
      name: formData.get("name"),
      submissionId: formData.get("submissionId"),
    });

    if (!validatedBody.ok) {
      return validatedBody.error;
    }

    const { code, name, submissionId } = validatedBody.data;

    const isExistedCode =
      (await prisma.debugProblems.count({
        where: { debugProblemCode: code },
      })) > 0;
    if (isExistedCode) {
      return {
        codeMessages: ["Code already used"],
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
        submissionIdMessages: [
          "Submission already used in problem code " +
            submission.debugProblems.debugProblemCode,
        ],
      };
    }
    if (submission.result !== "AC") {
      return {
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
      successMessages: [`Created problem code ${newCode}`],
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
      return {
        errorMessages: ["An internal server error occurred"],
      };
    } else {
      console.error(e);
      return {
        errorMessages: ["An internal server error occurred"],
      };
    }
  }
};
