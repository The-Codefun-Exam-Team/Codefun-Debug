"use server";

export interface CreateProblemFormState {
  code_message: string[];
  name_message: string[];
  sid_message: string[];
  messages: string[];
}

export const createProblem = async (_prevState: CreateProblemFormState, formData: FormData) => {};
