import type { NextPage } from "next";

/**
 *
 * @returns Login page
 * @url /login
 */
const Login: NextPage = () => {
	return (
		<div className="w-[90%] max-w-2xl mx-auto h-auto mt-[25vh] border-solid text-slate-700 border-slate-600 border-2 rounded-3xl">
			<div className="text-2xl py-3 px-4 text-center font-semibold">Please login to continue</div>
			<div className="flex justify-center">
				<input type="text" className="my-1 w-[95%] px-2 py-1 text-lg rounded-md border-slate-600 border-2" placeholder="username" />
			</div>
			<div className="flex justify-center">
				<input type="password" className="my-2 w-[95%] px-2 py-1 text-lg rounded-md border-slate-600 border-2" placeholder="password" />
			</div>
			<div className="flex justify-center">
				<button type="submit" className="text-lg font-medium text-slate-700 border-slate-600 border-2 rounded-lg px-2 mb-2 mt-1 " >Login</button>
			</div>
		</div>
	);
};

export default Login;
