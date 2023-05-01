"use client";
import { store } from "@redux/store";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

export const ReduxProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
