import Link from "next/link";

function NavigationBar(): JSX.Element {
	const OptionList: Array<[string, string]> = [
		["Contest", "/"],
		["Submissions", "/"],
		["Problems", "/"],
		["Ranking", "/"],
	];

	return (
		<div className="fixed top-0 left-0 right-0 bg-blue-900 text-white pt-4 pb-3">
			<div className="flex justify-between md:max-w-3xl max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-2">
				<Link href={"/"}>
					<a className="text-3xl">Codefun Debug</a>
				</Link>
				<div className="hidden md:flex justify-around text-l divide-x-2 h-min my-auto">
					{OptionList.map(([title, url]) => (
						<Link href={url} key={title}>
							<a className="px-4">{title}</a>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export { NavigationBar };
