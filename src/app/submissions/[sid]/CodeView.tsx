"use client";
import { clsx } from "@utils/shared";
import type monacoEditor from "monaco-editor";
import { useEffect, useRef, useState } from "react";

export const CodeView = ({ show, code }: { show: boolean; code: string }) => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
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

          editorRef.current = monaco.current.editor.create(editorDomRef.current, {
            automaticLayout: true,
            scrollBeyondLastColumn: 10,
            readOnly: true,
            domReadOnly: true,
          });

          editorRef.current?.setModel(monaco.current.editor.createModel("", "cpp"));

          monaco.current.editor.setTheme("light");
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
      editorRef.current.getModel()?.setValue(code);
    }
  }, [renderingEditor, code]);

  return (
    <section className={clsx("flex h-[70vh] w-full border-2 border-slate-600", !show && "hidden")}>
      {renderingEditor && (
        <div className="flex h-full w-full">
          <div className="grow-1 w-full self-center text-center text-2xl text-slate-700">
            Loading..
          </div>
        </div>
      )}
      <div className={clsx("h-full w-full", renderingEditor && "hidden")} ref={editorDomRef} />
    </section>
  );
};
