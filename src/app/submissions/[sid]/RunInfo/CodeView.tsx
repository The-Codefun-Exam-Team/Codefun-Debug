"use client";
import type monacoEditor from "monaco-editor";
import { useEffect, useRef, useState } from "react";

import AtlanticNight from "@/config/monaco-themes/atlantic-night.json";
import { useAppSelector } from "@/hooks";
import { clsx } from "@/utils";

import { CodeViewText } from "./CodeViewText";

export const CodeView = ({ source }: { source: string }) => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
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
        monaco.current.editor.defineTheme(
          "dark",
          AtlanticNight as monacoEditor.editor.IStandaloneThemeData,
        );
        if (editorDomRef.current) {
          editorRef.current?.dispose();

          editorRef.current = monaco.current.editor.create(
            editorDomRef.current,
            {
              automaticLayout: true,
              scrollBeyondLastColumn: 10,
              readOnly: true,
              domReadOnly: true,
            },
          );

          monaco.current?.editor.setTheme("light");

          editorRef.current.setModel(
            monaco.current.editor.createModel("", "cpp"),
          );
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
    <div className="flex size-full">
      <div className="grow-1 flex w-full flex-col justify-around rounded-md border-2 border-slate-500 text-2xl text-slate-700 dark:border-slate-600 dark:text-slate-200">
        <div className="text-center text-3xl">Loading...</div>
      </div>
    </div>;
    if (renderingEditor) return;
    if (isDark) {
      monaco.current?.editor.setTheme("dark");
    } else {
      monaco.current?.editor.setTheme("light");
    }
  }, [isDark, renderingEditor]);

  useEffect(() => {
    if (!renderingEditor && editorRef.current) {
      editorRef.current.getModel()?.setValue(source);
    }
  }, [renderingEditor, source]);

  return (
    <section className="flex size-full">
      {renderingEditor && <CodeViewText text="Loading..." />}
      <div
        className={clsx(
          "size-full overflow-hidden rounded-md border-2 border-slate-500 dark:border-slate-600",
          renderingEditor && "hidden",
        )}
        ref={editorDomRef}
      />
    </section>
  );
};
