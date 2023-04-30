import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../features/redux+thunk/store";

/**
 * @returns App Component
 */
// function MyApp({ Component, pageProps }: AppProps) {
// 	return (

// 		<Layout>
// 			<Component {...pageProps} />
// 		</Layout>
// 	);
// }
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</Layout>
	);
}
export default MyApp;
