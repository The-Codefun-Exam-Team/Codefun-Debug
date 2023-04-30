import Link from "next/link";
import type { ReactElement } from "react";
import { useState } from "react";

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
	
	const [checked, setChecked] = useState(false);
	
	const uncheck = () => {
		setChecked(false);
	};

	const handleChange = () => {
		setChecked(!checked);
	};

	fetch("beta/api/cf/verify",
		{
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "x-www-form-urlencoded",
			},
		}
	);

	return (
		<div className="sticky block justify-between top-0 left-0 right-0 pt-4 pb-3 bg-slate-200 text-slate-700 border-b-2 m-0 border-gray-400">
			<div className="inline-block md:flex md:justify-between max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-2 peer">
				<Link href={"/"} passHref>
					<a className="text-3xl font-semibold pt-1 mx-4">Codefun Debug</a>
				</Link>
				<div className="hidden md:flex justify-around text-l divide-x-2 divide-gray-500 pt-1 h-min my-auto">
					{OptionList.map(([title, url]) => (
						<>
							<Link href={url} key={title} passHref>
								<a className="px-4 font-medium">{title}</a>
							</Link>
						</>
					))}
				</div>
			</div>
			<input type="checkbox" checked={checked} onChange={handleChange} id="dropdown-check" className="hidden peer"></input>
			<label htmlFor="dropdown-check" className="inline-block md:hidden w-10 h-9 leading-[12px] cursor-pointer float-right mr-4
				peer-checked:[&>:nth-child(1)]:rotate-45
				peer-checked:[&>:nth-child(1)]:translate-y-[-3px]
				peer-checked:[&>:nth-child(1)]:translate-x-[6.2px]

				peer-checked:[&>:nth-child(2)]:opacity-0
				peer-checked:[&>:nth-child(2)]:w-1
				
				peer-checked:[&>:nth-child(3)]:rotate-[-45deg]
				peer-checked:[&>:nth-child(3)]:translate-x-[6px]
				">
				<span className="inline-block bg-slate-800 h-[5px] w-full rounded-md align-middle transition-all ease-out-back duration-300 origin-top-left"></span>
				<span className="inline-block bg-slate-800 h-[5px] w-full rounded-md align-middle transition-all ease-out-back duration-300"></span>
				<span className="inline-block bg-slate-800 h-[5px] w-full rounded-md align-middle transition-all ease-out-back duration-300 origin-bottom-left"></span>
			</label>
			
			<div id="dropdown-content" className="flex h-0 flex-col w-full md:peer-checked:hidden md:hidden peer-checked:h-[136px] opacity-0 peer-checked:opacity-100 
												scale-y-0 peer-checked:scale-y-100 transition-all duration-200
												origin-top">
				{OptionList.map(([title, url]) => (
					<Link href={url} key={title} passHref >
						<a onClick={uncheck} id={url.slice(1)} className="pl-10 font-medium py-1 first:mt-2">{title}</a>
					</Link>
				))}
			</div>
		</div>
	);
}

export { NavigationBar };
