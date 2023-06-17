"use client";
import { Transition } from "@headlessui/react";
import type { ReactNode } from "react";
import { useState } from "react";

import { CodeView } from "./CodeView";

export const RunInfoClient = ({ code, verdictNode }: { code: string; verdictNode: ReactNode }) => {
  const [isTransition, setIsTransition] = useState(false);
  const [buttonWaiting, setButtonWaiting] = useState(false);
  const [view, setView] = useState<"verdict" | "editor">("verdict");
  const toggleView = () => {
    setView((_view) => (_view === "verdict" ? "editor" : "verdict"));
    setIsTransition(false);
  };

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <button
        className="border-2 border-slate-600 p-2 text-lg font-medium text-slate-700 transition-opacity disabled:opacity-50"
        disabled={buttonWaiting}
        onClick={() => {
          if (!buttonWaiting) {
            setButtonWaiting(true);
            setIsTransition(true);
          }
        }}
      >
        {view === "verdict" ? "Your verdict" : "Your code"}
      </button>
      <Transition
        show={!isTransition && view === "verdict"}
        afterEnter={() => setButtonWaiting(false)}
        enter="ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={toggleView}
      >
        {verdictNode}
      </Transition>
      <Transition
        show={!isTransition && view === "editor"}
        unmount={false}
        afterEnter={() => setButtonWaiting(false)}
        className="flex h-full w-full"
        enter="ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={toggleView}
      >
        <CodeView code={code} />
      </Transition>
    </div>
  );
};
