"use client";
import { useAppSelector } from "@redux/hooks";
import { clsx } from "@utils/shared";
import type monacoEditor from "monaco-editor";
import { useEffect, useRef, useState } from "react";

import AtlanticNight from "@/features/monaco-themes/atlantic-night.json";

export const CodeView = ({ code }: { code: string }) => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const editorDomRef = useRef<HTMLDivElement | null>(null);
  const [renderingEditor, setRenderingEditor] = useState(true);
  const monaco = useRef<typeof monacoEditor | null>(null);
  const colorScheme = useAppSelector((state) => state.color.scheme);
  const isDark = colorScheme === "dark";

  useEffect(() => {
    let ignore = false;
    const loadEditor = async () => {
      if (!ignore) {
        monaco.current = await import("monaco-editor");
        monaco.current.editor.defineTheme(
          "dark",
          AtlanticNight as monacoEditor.editor.IStandaloneThemeData,
        );
        if (editorDomRef.current) {
          editorRef.current?.dispose();

          editorRef.current = monaco.current.editor.create(editorDomRef.current, {
            automaticLayout: true,
            scrollBeyondLastColumn: 10,
            readOnly: true,
            domReadOnly: true,
          });

          if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
              window.matchMedia("(prefers-color-scheme: dark)").matches)
          ) {
            monaco.current?.editor.setTheme("dark");
          } else {
            monaco.current?.editor.setTheme("light");
          }

          editorRef.current.setModel(monaco.current.editor.createModel("", "cpp"));
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
    if (isDark) {
      monaco.current?.editor.setTheme("dark");
    } else {
      monaco.current?.editor.setTheme("light");
    }
  }, [isDark]);

  useEffect(() => {
    if (!renderingEditor && editorRef.current) {
      editorRef.current.getModel()?.setValue(code);
    }
  }, [renderingEditor, code]);

  return (
    <section className="flex h-full w-full">
      {renderingEditor && (
        <div className="flex h-full w-full">
          <div className="grow-1 flex w-full flex-col justify-around rounded-md border-2 border-slate-500 text-2xl text-slate-700 dark:border-slate-600">
            <div className="text-center text-3xl">Loading...</div>
          </div>
        </div>
      )}
      <div
        className={clsx(
          "h-full w-full overflow-hidden rounded-md border-2 border-slate-500 dark:border-slate-600",
          renderingEditor && "hidden",
        )}
        ref={editorDomRef}
      />
    </section>
  );
};
