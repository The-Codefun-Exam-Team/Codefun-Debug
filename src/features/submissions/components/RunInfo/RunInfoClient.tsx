"use client";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { startTransition, useEffect, useState } from "react";

import { H3 } from "@/components";
import { useInterval } from "@/hooks";

export const RunInfoClient = ({
  verdictNode,
  codeNode,
}: {
  verdictNode: ReactNode;
  codeNode: ReactNode;
}) => {
  const [isTransition, setIsTransition] = useState(false);
  const [buttonWaiting, setButtonWaiting] = useState(false);
  const [view, setView] = useState<"verdict" | "editor">("verdict");
  const toggleView = () => {
    setView((_view) => (_view === "verdict" ? "editor" : "verdict"));
    setIsTransition(false);
  };

  return (
    <div className="flex h-[70vh] w-full flex-col gap-2 md:h-full">
      <button
        className="rounded-md border-2 border-slate-500 p-2 text-lg font-medium text-slate-700 transition-opacity dark:border-slate-600 dark:text-slate-200"
        disabled={buttonWaiting}
        onClick={() => {
          if (!buttonWaiting) {
            setButtonWaiting(true);
            setIsTransition(true);
          }
        }}
      >
        {view === "verdict" ? "Verdict" : "Code"}
      </button>
      <Transition
        show={!isTransition && view === "verdict"}
        className="relative size-full"
        afterEnter={() => setButtonWaiting(false)}
        enter="ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={toggleView}
      >
        <div className="absolute left-0 top-0 size-full overflow-y-auto rounded-md">
          {verdictNode}
        </div>
      </Transition>
      <Transition
        show={!isTransition && view === "editor"}
        unmount={false}
        afterEnter={() => setButtonWaiting(false)}
        className="relative size-full"
        enter="ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={toggleView}
      >
        <div className="absolute left-0 top-0 size-full rounded-md">
          {codeNode}
        </div>
      </Transition>
    </div>
  );
};

export const InQueue = () => {
  const router = useRouter();

  const refresh = () => startTransition(router.refresh);

  const { start, stop } = useInterval(refresh, 2000);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return <H3>In queue...</H3>;
};
