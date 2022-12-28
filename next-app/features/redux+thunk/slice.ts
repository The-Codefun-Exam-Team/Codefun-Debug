import {createSlice} from "@reduxjs/toolkit";

/**
 * @description Slice to keep track of the authentication state of user
 */
export const userSlice = createSlice({
	name: "user" as string,
	initialState: {
		username: null,
		token: null,
		userState: null,
	} as {
		username: string | null,
		token: string | null,
		userState: string | null,
        },
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
