import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/providers/redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
