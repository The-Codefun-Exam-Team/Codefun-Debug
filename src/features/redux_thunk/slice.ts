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
    setUser(
      state,
      action: PayloadAction<{
        user: UserData | null;
        refresh?(): void;
      }>,
    ) {
      state.user = action.payload.user;
      action.payload.refresh?.();
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading, setUser } = userSlice.actions;

export const colorSlice = createSlice({
  name: "color" as string,
  initialState: {
    scheme: null,
  } as { scheme: "light" | "dark" | null },
  reducers: {
    setScheme(state, action: PayloadAction<"light" | "dark" | null>) {
      state.scheme = action.payload;
      localStorage.theme = action.payload;
      if (action.payload === "dark") {
        localStorage.theme = "dark";
      } else if (action.payload === "light") {
        localStorage.theme = "light";
      } else {
        localStorage.removeItem("theme");
      }
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { setScheme } = colorSlice.actions;
