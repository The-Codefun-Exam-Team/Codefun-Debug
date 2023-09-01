import type { ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import type { AnyAction } from "redux";

import { colorSlice, userSlice } from "./slice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    color: colorSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
