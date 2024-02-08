import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { NavigationBar } from "@/components";
import { ReduxProvider } from "@/providers/redux";

import { ClientLogic } from "./ClientLogic";

export const metadata: Metadata = {
  title: {
    template: "%s - Codefun Debug",
    default: "Codefun Debug",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      {/* Avoid FOUC */}
      <script
        id="get-initial-color-scheme"
        dangerouslySetInnerHTML={{
          __html: `window.DID_FETCH_INITIAL_COLOR||(window.DID_FETCH_INITIAL_COLOR=!0,document.documentElement.dataset.theme=(()=>{const e=localStorage.getItem("theme");if(e&&["dark","light"].includes(e))return e;return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"})());`,
        }}
      />
    </head>
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
