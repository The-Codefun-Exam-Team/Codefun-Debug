import Link from "next/link";
import { ReactElement } from "react";

function NavigationBar(): ReactElement {
	const OptionList: Array<[string, string]> = [
		["Contest", "/"],
		["Submissions", "/"],
		["Problems", "/"],
		["Ranking", "/"],
	];

	return (
		<div className="fixed top-0 left-0 right-0 pt-4 pb-3 bg-slate-200 text-gray-700 border-b-2 border-gray-400">
			<div className="flex justify-between md:max-w-3xl max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-2">
				<Link href={"/"}>
					<a className="text-3xl font-semibold">Codefun Debug</a>
				</Link>
				<div className="hidden md:flex justify-around text-l divide-x-2 divide-gray-500 h-min my-auto">
					{OptionList.map(([title, url]) => (
						<Link href={url} key={title}>
							<a className="px-4 font-medium">{title}</a>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export { NavigationBar };
