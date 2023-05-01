"use client";
import { useEffect } from "react";
import { setLoading, setUser } from "src/features/redux_thunk/slice";
import { store } from "src/features/redux_thunk/store";

export const ClientLogic = () => {
  useEffect(() => {
    // We only want to run this on client.
    store.dispatch(async (dispatch) => {
      const res = await fetch("/beta/api/auth/authenticate", {
        method: "GET",
      });
      if (!res.ok) {
        // TODO: handle fetch error
        return;
      }
      const user = (await res.json()) as any;
      dispatch(setUser(user));
      dispatch(setLoading(false));
    });
  }, []);
  return <></>;
};
