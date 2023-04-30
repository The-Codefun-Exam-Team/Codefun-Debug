import type { NextPage } from "next";
import { useRef } from "react";
import { useRouter } from "next/router";
  

/**
 *
 * @returns Login page
 * @url /login
 */
const Login: NextPage = () => {
	const username = useRef<string>("");
	const password = useRef<string>("");
	const router = useRouter();
	const errorbox = useRef<HTMLDivElement>(null);
	const messagebox = useRef<HTMLDivElement>(null);
	const update_username = (e: React.ChangeEvent<HTMLInputElement>) => {
		username.current = e.target.value;
	};
	const update_password = (e: React.ChangeEvent<HTMLInputElement>) => {
		password.current = e.target.value;
	};
	const click_login = () => {
		login(username.current, password.current);
	};

	async function login (username: string,password: string) {
		const login_data = {
			username: username,
			password: password
		};
		const parsed_login_data = new URLSearchParams(login_data);
		const response = await fetch("/beta/api/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: parsed_login_data
			}
		);
		if ( response.status === 200 ) { // Login successful
			if ( router.query.prev === undefined ) {
				router.push("/");
			} else {
				router.push(router.query.prev as string);
			}
		}
		else {
			const { error } = await response.json() as { error: string };
			if (errorbox.current !== null) {
				errorbox.current.classList.remove("hidden");
				errorbox.current.classList.add("flex");
				setTimeout(() => {
					if (errorbox.current !== null) {
						errorbox.current.classList.remove("flex");
						errorbox.current.classList.add("hidden");
					}
				}, 5000);
			}
			if (messagebox.current !== null) {
				messagebox.current.innerText = `Error: ${error}. Please try again.`;
			}
		}
	};

	return (
		<div className="w-[90%] max-w-2xl mx-auto h-auto mt-[30vh] border-solid text-slate-700 border-slate-600 border-2 rounded-3xl">
			<div className="text-2xl py-3 px-4 text-center font-semibold">Please login to continue</div>
			<div className="hidden justify-center mb-2" ref={errorbox} >
				<div className="inline text-center p-1 text-md font-semibold text-white mx-4 w-full bg-red-400 rounded-md" ref={messagebox}></div>
			</div>
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
