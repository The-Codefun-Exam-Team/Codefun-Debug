import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
	username: string | null,
	token: string | null,
	state: string | null,
}

/**
 * @description Slice to keep track of the authentication state of user
 */
export const userSlice = createSlice({
	name: "user" as string,
	initialState: {
		username: "???",
		token: null,
		state: null,
	} as UserState,
	// Reducers for testing purposes
	reducers: {
		setUser: (state, action: PayloadAction<string>) => {
			return { ...state, ...{username: action.payload} };
		}
	},
	extraReducers: {

	},
});

export const {setUser} = userSlice.actions;
