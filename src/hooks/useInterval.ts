import { useCallback, useEffect, useRef, useState } from "react";

export const useInterval = (fn: TimerHandler, interval: number) => {
  const [active, setActive] = useState(false);
  const intervalRef = useRef<number>();
  const fnRef = useRef<TimerHandler>(() => {
    // do nothing
  });

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const start = useCallback(() => {
    setActive((old) => {
      if (!old && !intervalRef.current) {
        intervalRef.current = window.setInterval(fnRef.current, interval);
      }
      return true;
    });
  }, [interval]);

  const stop = useCallback(() => {
    setActive(false);
    window.clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);

  const toggle = useCallback(() => {
    if (active) {
      stop();
    } else {
      start();
    }
  }, [active, start, stop]);

  return { start, stop, toggle, active };
};
