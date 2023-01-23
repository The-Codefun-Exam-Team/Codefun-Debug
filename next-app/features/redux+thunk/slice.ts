import {createSlice} from "@reduxjs/toolkit";

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
		username: null,
		token: null,
		state: null,
	} as UserState,
	// Reducers for testing purposes
	reducers: {
		setUser: (state, action) => {
			return {...state,...action.payload};
		}
	},
	extraReducers: {

	},
});

export const {setUser} = userSlice.actions;
