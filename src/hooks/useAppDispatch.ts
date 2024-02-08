import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store/redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
