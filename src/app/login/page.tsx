import type { Metadata } from "next";

import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => (
  <div className="flex h-full w-full items-center justify-center self-center">
    <LoginForm />
  </div>
);

export default Page;
