"use client";
import { DiffEditor, useMonaco } from '@monaco-editor/react';

import type { ProblemData } from './page';

export const Editor = ({ data }: { data: ProblemData }) => {
	const monaco = useMonaco();
	monaco?.editor.defineTheme('my-light', {
		base: 'vs',
		inherit: true,
		rules: [],
		colors: {
			'editor.background': '#f1f5f9',
		}
	})

	return (
		<div className='inline-block mt-10 ml-auto w-[95%]'>
			<DiffEditor
				height="70vh"
				width={'100%'}
				language='cpp'
				theme='vs-dark'
				options={{ renderSideBySide: false , scrollBeyondLastLine: false}}
				original={data.code}
				modified={data.code}
				/>
		</div>
	)
};