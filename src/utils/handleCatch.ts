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
    if (e instanceof Error) {
      console.error("Unexpected error: ", e.message, e.stack);
      return {
        ok: false,
        message: "An internal server error occurred. Please try again later.",
        status: 500,
      };
    } else {
      console.log("Unexpected error: ", e);
      return {
        ok: false,
        message: "An internal server error occurred. Please try again later.",
        status: 500,
      };
    }
  }
};
