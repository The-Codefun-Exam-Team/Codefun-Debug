"use client";
import type { MonacoDiffEditor } from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import type { ProblemData } from "./page";

export const UserEditor = ({ data, pid }: { data: ProblemData; pid: string }) => {
  // TODO: add options for editor
  // TODO: responsive UI
  const router = useRouter();
  const editorRef = useRef<MonacoDiffEditor | null>(null);
  const handleEditorDidMount = (editor: MonacoDiffEditor) => {
    editorRef.current = editor;
  };
  const submitCode = async (): Promise<void> => {
    const code = editorRef.current?.getModifiedEditor().getValue();
    const res = await fetch("/beta/api/dbg/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problem: pid,
        code: code,
      }),
    });
    if (!res.ok) {
      // TODO: handle fetch error
      // show error by replacing submit button with error message
      // use transition
      return;
    }
    const data = await res.json();
    router.push(`/submissions/${data.id}`);
  };

  return (
    // TODO: Add difference box
    // TODO: support for python problems and more
    <>
      <div className="mx-auto mt-10 w-[95%]">
        <DiffEditor
          className="border-2 border-slate-600"
          height="70vh"
          width={"100%"}
          language="cpp"
          theme="light"
          options={{
            renderSideBySide: false,
            renderOverviewRuler: false,
            scrollBeyondLastColumn: 10,
          }}
          original={data.code}
          modified={data.code}
          onMount={handleEditorDidMount}
          loading={
            <div className="flex h-[70vh] w-full border-2 border-slate-600">
              <div className="grow-1 w-full self-center text-center text-2xl text-slate-700">
                Loading editor
              </div>
            </div>
          }
        />
      </div>
      <button
        type="submit"
        onClick={submitCode}
        className=" text-md relative bottom-10 mx-auto rounded-sm bg-slate-100 px-4 py-[1px] font-semibold text-slate-700 shadow-md shadow-slate-200 active:shadow-inner"
      >
        Submit
      </button>
    </>
  );
};
