import type { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";

import type { RootState } from "@/store/redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
