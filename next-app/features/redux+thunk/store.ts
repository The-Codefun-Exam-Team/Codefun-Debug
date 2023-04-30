import {
	configureStore,
	ThunkAction,
} from "@reduxjs/toolkit";
import { userSlice } from "./slice";
import type { AnyAction } from "redux";


export const store =  configureStore({
	reducer: {
		[userSlice.name]: userSlice.reducer,
	},	
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;




