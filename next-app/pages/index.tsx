import type { NextPage } from "next";
import { useAppSelector, useAppDispatch } from "../features/redux+thunk/store";
import { useEffect } from "react";
import { setUser } from "../features/redux+thunk/slice";

/**
 *
 * @returns Home page
 * @url /
 */

const Home: NextPage = () => {
	

	return (
		<>
			<div>Home Page</div>
		</>
	);
};

export default Home;
