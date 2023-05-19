"use client";
import type { MonacoDiffEditor  } from "@monaco-editor/react";
import { DiffEditor  } from "@monaco-editor/react";
import { useRef } from "react";

import type { ProblemData } from "./page";

export const UserEditor = ({ data }: { data: ProblemData }) => {
	// TODO: add options for editor
	// TODO: responsive UI
	const editorRef = useRef<MonacoDiffEditor|null>(null);
	const handleEditorDidMount = (editor:MonacoDiffEditor) => {
		editorRef.current = editor;
	}
	// const submitCode = async (): Promise<void> => {

	// }

	return (
		// TODO: handle loading state
		// TODO: Add difference box
		<>
			<div className="mx-auto mt-10 w-[95%]">
				<DiffEditor
					className="border-2 border-slate-600"
					height="70vh"
					width={"100%"}
					language="cpp"
					theme="light"
					options={{ renderSideBySide: false, renderOverviewRuler: false }}
					original={data.code}
					modified={data.code}
					onMount={handleEditorDidMount}
				/>
			</div>
			<button type="submit" className=" relative bottom-10 mx-auto text-md font-semibold text-slate-700 bg-slate-100 px-4 py-[1px] shadow-md shadow-slate-200 active:shadow-inner rounded-sm" >Submit</button>
			
		</>
  );
};
