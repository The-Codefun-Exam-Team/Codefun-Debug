import "./globals.css";

import { NavigationBar } from "@components/index.js";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ClientLogic } from "./ClientLogic.js";
import { ReduxProvider } from "./ReduxProvider.js";

export const metadata: Metadata = {
  title: {
    template: "%s - Codefun Debug",
    default: "Codefun Debug",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head></head>
    <body>
      <ReduxProvider>
        <div id="root-container">
          <NavigationBar />
          <main id="main-content">{children}</main>
        </div>
        <ClientLogic />
      </ReduxProvider>
    </body>
  </html>
);

export default RootLayout;
