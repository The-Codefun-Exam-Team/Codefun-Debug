"use client";
import { useEffect } from "react";

import { setScheme, store } from "@/store/redux";
import { isColorScheme } from "@/utils";

let didCheckInitialTheme = false;

export const ClientLogic = () => {
  useEffect(() => {
    if (!didCheckInitialTheme) {
      didCheckInitialTheme = true;
      const theme = localStorage.getItem("theme");
      store.dispatch((dispatch) => {
        dispatch(setScheme(isColorScheme(theme) ? theme : null));
      });
    }
  }, []);
  return <></>;
};
