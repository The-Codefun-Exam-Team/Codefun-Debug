import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "./LoginForm";

const metadata: Metadata = {
  title: "Login",
};

// TODO: migrate to Server Actions when it is supported (/api/auth/signin will no longer be needed).
// Note: LoginForm is wrapped with Suspense as it uses `useSearchParams()`.
const Page = () => (
  <Suspense>
    <LoginForm />
  </Suspense>
);

export { metadata };
export default Page;
