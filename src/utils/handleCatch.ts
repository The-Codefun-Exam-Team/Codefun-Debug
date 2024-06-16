import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import type { FunctionReturnTypeError } from "@/types";

export const handleCatch = (e: unknown): FunctionReturnTypeError => {
  if (e instanceof PrismaClientKnownRequestError) {
    const statusCode = parseInt(e.code.slice(1));
    return {
      ok: false,
      message: e.message,
      status: statusCode,
    };
  } else {
    console.error("Unexpected error: ", e);
    if (e instanceof Error) {
      return {
        ok: false,
        message: e.message,
        status: 500,
      };
    } else {
      return {
        ok: false,
        message: "An internal server error occurred. Please try again later.",
        status: 500,
      };
    }
  }
};
