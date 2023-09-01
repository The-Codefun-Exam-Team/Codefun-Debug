"use client";
import { setLoading, setScheme, setUser } from "@redux/slice";
import { store } from "@redux/store";
import type { UserData } from "@schemas/loginSchema";
import { isColorScheme } from "@utils/shared";
import { useEffect } from "react";

let didFetchUser = false;
let didCheckInitialTheme = false;

export const ClientLogic = () => {
  useEffect(() => {
    if (!didFetchUser) {
      didFetchUser = true;
      // We only want to run this on client.
      store.dispatch(async (dispatch) => {
        const res = await fetch("/api/temp/auth/authenticate", {
          method: "GET",
        });
        if (!res.ok) {
          // TODO: handle fetch error
          return;
        }
        const user = (await res.json()) as UserData;
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
