import { cache } from "react";

import { getProblemsScore } from "./getProblemsScore";

export const getMemoProblemsScore = cache(getProblemsScore);
