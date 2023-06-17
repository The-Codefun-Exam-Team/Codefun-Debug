"use client";
import { clsx } from "@utils/shared";
import type monacoEditor from "monaco-editor";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { ProblemData } from "./types";

export const UserEditor = ({ data, pid }: { data: ProblemData; pid: string }) => {
  // TODO: add options for editor
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const editorRef = useRef<monacoEditor.editor.IStandaloneDiffEditor | null>(null);
  const editorDomRef = useRef<HTMLDivElement | null>(null);
  const [renderingEditor, setRenderingEditor] = useState(true);
  const monaco = useRef<typeof monacoEditor | null>(null);

  useEffect(() => {
    let ignore = false;
    const loadEditor = async () => {
      if (!ignore) {
        monaco.current = await import("monaco-editor");
        if (editorDomRef.current) {
          editorRef.current?.dispose();

          editorRef.current = monaco.current.editor.createDiffEditor(editorDomRef.current, {
            automaticLayout: true,
            renderSideBySide: false,
            renderOverviewRuler: false,
            scrollBeyondLastColumn: 10,
          });

          monaco.current.editor.setTheme("light");

          editorRef.current.setModel({
            original: monaco.current.editor.createModel("", "cpp"),
            modified: monaco.current.editor.createModel("", "cpp"),
          });
        }
        setRenderingEditor(false);
      }
    };
    loadEditor();
    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    if (!renderingEditor && editorRef.current) {
      editorRef.current.getOriginalEditor()?.setValue(data.code);
      editorRef.current.getModifiedEditor()?.setValue(data.code);
    }
  }, [renderingEditor, data.code]);

  const submitCode = async () => {
    if (!editorRef.current) {
      setSubmitError("Editor hasn't been loaded.");
      return;
    }
    const code = editorRef.current.getModifiedEditor().getValue();
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
      setSubmitError("Error submitting code, please try again after 1'30'.");
      return;
    }
    const data = (await res.json()) as {
      id: string;
    };
    router.push(`/submissions/${data.id}`);
  };
  useEffect(() => {
    const removeErrorTimer = setTimeout(() => setSubmitError(""), 5000);
    return () => clearTimeout(removeErrorTimer);
  }, [submitError]);

  return (
    // TODO: Add difference box
    // TODO: support for python problems and more
    <>
      <div>
        <section className="flex h-[80vh] w-full flex-col border-2 border-slate-600">
          {renderingEditor && (
            <div className="flex h-full w-full">
              <div className="grow-1 w-full self-center text-center text-2xl text-slate-700">
                Loading editor...
              </div>
            </div>
          )}
          <div className={clsx("h-full w-full", renderingEditor && "hidden")} ref={editorDomRef} />
          {/* TODO: Add transition (if possible) */}
          <div className="absolute bottom-3 flex w-full justify-center">
            {submitError ? (
              <div className="rounded-sm border-2 border-red-200 bg-red-100 px-4 py-1 text-red-800">
                {submitError}
              </div>
            ) : (
              <button
                type="submit"
                onClick={submitCode}
                className="border-2 border-slate-600 bg-slate-100 px-4 py-[1px] font-semibold text-slate-700 shadow-md shadow-slate-400 active:shadow-inner"
              >
                Submit
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
