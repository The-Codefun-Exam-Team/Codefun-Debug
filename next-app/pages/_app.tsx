import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

/**
 * @returns App Component
 */
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
