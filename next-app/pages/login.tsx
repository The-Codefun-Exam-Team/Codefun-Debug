import type { NextPage } from "next";

/**
 *
 * @returns Login page
 * @url /login
 */
const Login: NextPage = () => {
	return (
		<div className="w-full max-w-2xl mx-auto h-auto mt-[20vh] border-solid text-slate-800 border-slate-500 border-2 rounded-3xl">
			<div className="text-2xl py-3 px-4 text-center  font-semibold">Please Login</div>
			<div className="flex justify-center">
				<input type="text" className="my-1 w-[95%] px-2 py-1 text-lg rounded-md border-slate-500 border-2" placeholder="username" />
			</div>
			<div className="flex justify-center">
				<input type="text" className="my-2 w-[95%] px-2 py-1 text-lg rounded-md border-slate-500 border-2" placeholder="password" />
			</div>
		</div>
	);
};

export default Login;
