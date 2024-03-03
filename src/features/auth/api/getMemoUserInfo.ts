import { cache } from "react";

import { getUserInfo } from "./getUserInfo";

export const getMemoUserInfo = cache(getUserInfo);
