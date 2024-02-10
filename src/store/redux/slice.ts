import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { ColorScheme, UserData } from "@/types";

export interface UserSliceState {
  loading: boolean;
  user: UserData | null;
}

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

export interface ColorSliceState {
  selectedScheme: ColorScheme;
  isSystemScheme: boolean;
}

export const colorSlice = createSlice({
  name: "color" as string,
  initialState: {
    selectedScheme: "light",
    isSystemScheme: false,
  } as ColorSliceState,
  reducers: {
    setScheme(state, action: PayloadAction<ColorScheme | null>) {
      if (action.payload) {
        state.selectedScheme = action.payload;
        state.isSystemScheme = false;
        document.documentElement.dataset.theme = action.payload;
        localStorage.setItem("theme", action.payload);
      } else {
        const systemTheme: ColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        state.selectedScheme = systemTheme;
        state.isSystemScheme = true;
        document.documentElement.dataset.theme = systemTheme;
        localStorage.removeItem("theme");
      }
    },
  },
});

export const { setScheme } = colorSlice.actions;
