import type { Metadata } from "next";

import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => (
  <div className="flex size-full items-center justify-center self-center">
    <LoginForm />
  </div>
);

export default Page;
