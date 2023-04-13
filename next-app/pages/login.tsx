import type { NextPage } from "next";
import { useRef } from "react";

/**
 * function to login
 * 
 * @param username : username of the user
 * @param password : password of the user
 */
const login = (username: string,password: string) => {
	const login_data = {
		username: username,
		password: password
	};
	const parsed_login_data = new URLSearchParams(login_data);
	fetch("http://localhost:3000/beta/api/login",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: parsed_login_data
		}
	);
};

/**
 *
 * @returns Login page
 * @url /login
 */
const Login: NextPage = () => {
	const username = useRef("");
	const password = useRef("");
	const update_username = (e: React.ChangeEvent<HTMLInputElement>) => {
		username.current = e.target.value;
	};
	const update_password = (e: React.ChangeEvent<HTMLInputElement>) => {
		password.current = e.target.value;
	};
	const click_login = () => {
		login(username.current, password.current);
	};
	return (
		<div className="w-[90%] max-w-2xl mx-auto h-auto mt-[25vh] border-solid text-slate-700 border-slate-600 border-2 rounded-3xl">
			<div className="text-2xl py-3 px-4 text-center font-semibold">Please login to continue</div>
			<div className="flex justify-center">
				<input type="text" onChange={update_username} className="my-1 w-[95%] px-2 py-1 text-lg rounded-md border-slate-600 border-2" placeholder="username" />
			</div>
			<div className="flex justify-center">
				<input type="password" onChange={update_password} className="my-2 w-[95%] px-2 py-1 text-lg rounded-md border-slate-600 border-2" placeholder="password" />
			</div>
			<div className="flex justify-center">
				<button type="submit" onClick={click_login} className="text-lg font-medium text-slate-700 border-slate-600 border-2 rounded-lg px-2 mb-2 mt-1 " >Login</button>
			</div>
		</div>
	);
};

export default Login;
