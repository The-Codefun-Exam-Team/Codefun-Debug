import { cache } from "react";

import { getUserInfo } from "./getUserInfo";

export const getCacheUserInfo = cache(getUserInfo);
