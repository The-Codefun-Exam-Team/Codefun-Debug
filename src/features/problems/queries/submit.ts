import prisma from "@database/prisma/instance";

import { submitCodefunProblem } from "../api";
import { calcSubmissionScore } from "./calcSubmissionScore";

export const submit = async (code: string, codetext: string) => {
  const debugProblems = await prisma.debugProblems.findUniqueOrThrow({
    where: {
      code,
    },
    select: {
      language: true,
      problem: {
        select: {
          pid: true,
        },
      },
    },
  });
  const codefunProblem = debugProblems.problem;
  const rid = await submitCodefunProblem({
    pid: codefunProblem.pid,
    codetext: codetext,
    language: debugProblems.language,
  });

  const codefunSubmission = await prisma.runs.findUniqueOrThrow({
    where: {
      rid,
    },
    select: {
      submittime: true,
      result: true,
      score: true,
      subs_code: {
        select: {
          code: true,
        },
      },
      team: {
        select: {
          tid: true,
        },
      },
    },
  });
  const team = codefunSubmission.team;
  const submission = await prisma.debugSubmissions.create({
    data: {
      rid,
      tid: team.tid,
      dpid: codefunProblem.pid,
      language: debugProblems.language,
      submittime: codefunSubmission.submittime,
      result: "Q",
      score: 0,
      code: codetext,
    },
    select: {
      drid: true,
    },
  });
  void calcSubmissionScore(submission.drid);
  return submission.drid;
};
