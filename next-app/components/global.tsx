import Link from "next/link";
import type { ReactElement } from "react";

/**
 *
 * @returns Navigation bar element
 */
function NavigationBar(): ReactElement {
	/** List of options in the navigation bar */
	const OptionList: Array<[string, string]> = [
		["Problems", "/problems"],
		["Submissions", "/submissions"],
		["Rankings", "/rankings"],
		["About", "/about"],
	];

	return (
		<div className="sticky block top-0 left-0 right-0 pt-4 pb-3 bg-slate-200 text-gray-700 border-b-2 m-0 border-gray-400">
			<div className="flex justify-between md:max-w-3xl max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-2">
				<Link href={"/"} passHref>
					<a className="text-3xl font-semibold pt-1 mx-4">Codefun Debug</a>
				</Link>
				<div className="hidden md:flex justify-around text-l divide-x-2 divide-gray-500 pt-1 h-min my-auto">
					{OptionList.map(([title, url]) => (
						<Link href={url} key={title} passHref>
							<a className="px-4 font-medium">{title}</a>
						</Link>
					))}
				</div>
				<div className="md:hidden">
					<input type="checkbox" id="check" className="peer"></input>
					<label htmlFor="check" className="inline-block w-10 h-auto leading-3 cursor-pointer">
						<span className="inline-block bg-black h-1.5 w-full rounded-md align-bottom "></span>
						<span className="inline-block bg-black h-1.5 w-full rounded-md align-bottom "></span>
						<span className="inline-block bg-black h-1.5 w-full rounded-md align-bottom "></span>
    				</label>
					
				</div>
			</div>
		</div>
	);
}

export { NavigationBar };
