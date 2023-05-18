import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { UserData } from "@schemas/loginSchema";

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
