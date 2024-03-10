"use server";

import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createProblemSchema } from "@schemas/createProblemSchema";
import { cookies } from "next/headers";

import { getUser } from "@/features/auth";

export interface CreateProblemFormState {
  code_messages: string[];
  name_messages: string[];
  rid_messages: string[];
  messages: string[];
  success_messages: string[];
}

const initialState: CreateProblemFormState = {
  code_messages: [],
  name_messages: [],
  rid_messages: [],
  messages: [],
  success_messages: [],
};

export const createProblem = async (
  _prevState: CreateProblemFormState,
  formData: FormData,
): Promise<CreateProblemFormState> => {
  try {
    const token = cookies().get("token")?.value;
    const userInfo = await getUser(token);
    if (!userInfo.ok || userInfo.user.status !== "Admin") {
      return {
        ...initialState,
        messages: ["You are not authorized to create problems"],
      };
    }
    const formRid = formData.get("rid") as unknown;
    if (isNaN(formRid as number)) {
      return {
        ...initialState,
        rid_messages: ["Submission ID must be a number"],
      };
    }

    const validatedBody = await createProblemSchema.spa({
      code: formData.get("code"),
      name: formData.get("name"),
      rid: parseInt(formRid as string, 10),
    });

    if (!validatedBody.success) {
      const errors = validatedBody.error.format();
      return {
        ...initialState,
        code_messages: errors.code?._errors ?? [],
        name_messages: errors.name?._errors ?? [],
        rid_messages: errors.rid?._errors ?? [],
        messages: errors._errors ?? [],
      };
    }

    const { code, name, rid } = validatedBody.data;

    if (code) {
      const problemInfo = await prisma.problems.findUnique({
        where: {
          code: code,
        },
      });
      if (problemInfo !== null) {
        return {
          ...initialState,
          code_messages: ["Code already used"],
        };
      }
    }

    // check rid validity
    if ((await prisma.debugProblems.count({ where: { rid: rid } })) > 0) {
      return {
        ...initialState,
        rid_messages: ["Submission already used"],
      };
    }
    const runInfo = await prisma.runs.findUnique({
      where: {
        rid: rid,
      },
      select: {
        result: true,
        score: true,
        language: true,
        pid: true,
      },
    });
    if (runInfo === null) {
      return {
        ...initialState,
        rid_messages: ["Submission not found"],
      };
    }
    if (runInfo.result === "AC") {
      return {
        ...initialState,
        rid_messages: ["Accepted submission cannot be used"],
      };
    }

    if (!code) {
      // get suggested code
      const prefixPattern = "D";
      const numberPattern = "[0-9]+";
      const suffexPattern = "";
      const codePattern = `${prefixPattern}${numberPattern}${suffexPattern}`;

      const maxCodeQuery = (await prisma.$queryRaw`
        SELECT MAX(code) FROM debug_problems 
        WHERE code REGEXP ${codePattern}`) as { "MAX(code)": string }[];
      const maxCode = maxCodeQuery[0]["MAX(code)"];

      // assuming maxCode is not null
      const number = maxCode.match(numberPattern);
      if (number === null) {
        return {
          ...initialState,
          messages: ["An internal server error occurred"],
        };
      }
      const newNumber = parseInt(number[0], 10) + 1;
      const newCode = `${prefixPattern}${newNumber.toString().padStart(3, "0")}`;

      await prisma.debugProblems.create({
        data: {
          code: newCode,
          name: name ?? newCode,
          rid: rid,
          score: runInfo.score,
          language: runInfo.language,
          pid: runInfo.pid,
          result: runInfo.result,
          mindiff: 10000,
        },
      });

      return {
        ...initialState,
        success_messages: [`Created problem code ${newCode}`],
      };
    } else {
      await prisma.debugProblems.create({
        data: {
          code: code,
          name: name ?? code,
          rid: rid,
          score: runInfo.score,
          language: runInfo.language,
          pid: runInfo.pid,
          result: runInfo.result,
          mindiff: 10000,
        },
      });
      return {
        ...initialState,
        success_messages: [`Created problem code ${code}`],
      };
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
      return {
        ...initialState,
        messages: ["An internal server error occurred"],
      };
    } else {
      console.error(e);
      return {
        ...initialState,
        messages: ["An internal server error occurred"],
      };
    }
  }
};
