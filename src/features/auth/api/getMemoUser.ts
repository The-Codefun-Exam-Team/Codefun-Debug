import { cache } from "react";

import { getUser } from "./getUser";

export const getMemoUser = cache(getUser);
