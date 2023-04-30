import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  id: number | null;
  username: string | null;
  name: string | null;
  group: {
    id: number | null;
    name: string | null;
  };
  status: string | null;
  avatar: string | null;
  score: number | null;
  solved: number | null;
  ratio: number | null;
  email: string | null;
}

export interface UserSliceState {
  loading: boolean;
  user: UserData | null;
}

/**
 * Slice to keep track of the authentication state of user
 */
export const userSlice = createSlice({
  name: "user" as string,
  initialState: {
    loading: true,
    user: null,
  } as UserSliceState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      if (state.loading) {
        state.loading = false;
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
