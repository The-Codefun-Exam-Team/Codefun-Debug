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
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      {
        // script to avoid FOUC (from TailwindCSS docs)
        <script
          id="get-initial-color-scheme"
          dangerouslySetInnerHTML={{
            __html:
              "if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {document.documentElement.classList.add('dark')} else {document.documentElement.classList.remove('dark')}",
          }}
        ></script>
      }
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
