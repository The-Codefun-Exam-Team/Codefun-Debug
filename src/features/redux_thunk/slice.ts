import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  id: number;
  username: string;
  name: string;
  group: {
    id: number;
    name: string;
  };
  status: string;
  avatar: string;
  score: number;
  solved: number;
  ratio: number;
  email: string;
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
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading, setUser } = userSlice.actions;

export default userSlice.reducer;
