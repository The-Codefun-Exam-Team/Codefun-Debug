import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserData {
	id: number | null ,
    username: string | null,
    name: string | null ,
    group: {
      id: number | null,
      name: string | null,
    },
    status: string | null,
    avatar: string | null,
    score: number | null,
    solved: number | null,
    ratio: number | null,
	email: string | null, 
}

/**
 * @description Slice to keep track of the authentication state of user
 */
export const userSlice = createSlice({
	name: "user" as string,
	initialState: {} as UserData,
	// Reducers for testing purposes
	reducers: {}
});


