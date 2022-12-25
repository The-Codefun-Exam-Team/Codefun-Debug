import {
	configureStore,
	ThunkAction,
} from "@reduxjs/toolkit";

import { userSlice } from "./slice";

import { createWrapper } from "next-redux-wrapper";

import type { Action } from "redux";


const makeStore = () => {
	return configureStore({
		reducer: {
			[userSlice.name]: userSlice.reducer,
		},	
	});
};

export const wrapper = createWrapper<AppStore>(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

