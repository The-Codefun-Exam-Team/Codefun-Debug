"use client";
import type monacoEditor from "monaco-editor";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import atlanticNight from "@/config/monaco-themes/atlantic-night.json";
import type { DetailedProblemInfo } from "@/features/problems";
import { actionSubmit } from "@/features/submissions";
import { useAppSelector } from "@/hooks";
import { clsx } from "@/utils";

export interface EditorClientProps {
  problemData: DetailedProblemInfo;
  code: string;
  // A simple client check to decide whether to show the UI.
  // This cannot (and must not!) cause authorization issues.
  isLoggedIn: boolean;
}

export const EditorClient = ({
  problemData,
  isLoggedIn,
  code,
}: EditorClientProps) => {
  // TODO: add options for editor
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const editorRef = useRef<monacoEditor.editor.IStandaloneDiffEditor | null>(
    null,
  );
  const editorDomRef = useRef<HTMLDivElement | null>(null);
  const [renderingEditor, setRenderingEditor] = useState(true);
  const monaco = useRef<typeof monacoEditor | null>(null);
  const colorScheme = useAppSelector((state) => state.color.selectedScheme);
  const isDark = colorScheme === "dark";

  useEffect(() => {
    let ignore = false;
    const loadEditor = async () => {
      if (!ignore) {
        monaco.current = await import("monaco-editor");
        monaco.current.editor.defineTheme("dark", atlanticNight);
        if (editorDomRef.current) {
          editorRef.current?.dispose();

          editorRef.current = monaco.current.editor.createDiffEditor(
            editorDomRef.current,
            {
              automaticLayout: true,
              renderSideBySide: false,
              renderOverviewRuler: false,
              scrollBeyondLastColumn: 10,
            },
          );

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
    if (renderingEditor) return;
    if (isDark) {
      monaco.current?.editor.setTheme("dark");
    } else {
      monaco.current?.editor.setTheme("light");
    }
  }, [isDark, renderingEditor]);

  useEffect(() => {
    if (!renderingEditor && editorRef.current) {
      editorRef.current.getOriginalEditor()?.setValue(problemData.source);
      editorRef.current.getModifiedEditor()?.setValue(problemData.source);
    }
  }, [renderingEditor, problemData.source]);

  const submitCode = async () => {
    if (!editorRef.current) {
      setSubmitError("Editor hasn't been loaded.");
      return;
    }
    const source = editorRef.current.getModifiedEditor().getValue();
    const res = await actionSubmit(code, source);
    if (!res.ok) {
      setSubmitError(res.message);
      return;
    }
    router.push(`/submissions/${res.data}`);
  };
  useEffect(() => {
    const removeErrorTimer = setTimeout(() => setSubmitError(""), 5000);
    return () => clearTimeout(removeErrorTimer);
  }, [submitError]);

  return (
    // TODO: Add difference box
    // TODO: support for python problems and more
    <section className="relative h-[60vh] w-full self-stretch md:h-auto">
      {renderingEditor && (
        <div className="flex size-full rounded-md border-2 border-slate-500 dark:border-slate-600">
          <div className="grow-1 w-full self-center text-center text-2xl text-slate-700">
            Loading editor...
          </div>
        </div>
      )}
      <div
        className={clsx(
          "size-full overflow-hidden rounded-md border-2 border-slate-500 dark:border-slate-600",
          renderingEditor && "hidden",
        )}
        ref={editorDomRef}
      />
      {/* TODO: Add transition (if possible) */}
      {isLoggedIn && (
        <div className="absolute bottom-3 flex w-full justify-center">
          {submitError ? (
            <div className="rounded-md border-2 border-red-200 bg-red-100 px-4 py-1 text-red-800">
              {submitError}
            </div>
          ) : (
            <button
              type="button"
              onClick={submitCode}
              className="rounded-md border-2 border-slate-600 bg-slate-100 px-4 py-px font-semibold text-slate-700 shadow-md shadow-slate-500 active:shadow-inner active:shadow-slate-400 dark:border-slate-400 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-600 active:dark:shadow-slate-700"
            >
              Submit
            </button>
          )}
        </div>
      )}
    </section>
  );
};
