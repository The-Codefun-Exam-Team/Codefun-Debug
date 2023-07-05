import type { Metadata } from "next";

import { CreateProblemForm } from "./createProblemForm";

export const metadata: Metadata = {
  title: "Create Problem",
};

const Page = () => {
  return <CreateProblemForm />;
};

export default Page;
