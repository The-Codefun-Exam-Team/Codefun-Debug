"use client";
import { isColorScheme } from "@utils/shared";
import { useEffect } from "react";

import { actionAuthenticate } from "@/features/auth";
import { setLoading, setScheme, setUser, store } from "@/store/redux";

let didFetchUser = false;
let didCheckInitialTheme = false;

export const ClientLogic = () => {
  useEffect(() => {
    if (!didFetchUser) {
      didFetchUser = true;
      // We only want to run this on client.
      store.dispatch(async (dispatch) => {
        const res = await actionAuthenticate();
        if (!res.ok) {
          dispatch(setLoading(false));
          // TODO: handle fetch error
          return;
        }
        const user = res.user;
        dispatch(
          setUser({
            user,
          }),
        );
        dispatch(setLoading(false));
      });
    }
  }, []);

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
