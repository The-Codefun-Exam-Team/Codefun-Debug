import { NavigationBar } from "./global";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../features/redux+thunk/store";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="h-screen">
			<Provider store={store}>
				<NavigationBar></NavigationBar>
				{children}
			</Provider>
		</div>
	);
}
