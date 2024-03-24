import { cache } from "react";

import { getProblem } from "./getProblem";

export const getMemoProblem = cache(getProblem);
