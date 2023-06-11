import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { NavigationBar } from "@/components";

import { ClientLogic } from "./ClientLogic";
import { ReduxProvider } from "./ReduxProvider";

export const metadata: Metadata = {
  title: {
    template: "%s - Codefun Debug",
    default: "Codefun Debug",
  },
  icons: "/beta/favicon.ico",
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
