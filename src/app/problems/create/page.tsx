import type { Metadata } from "next";

import { CreateProblemForm } from "./CreateProblemForm";

const metadata: Metadata = {
  title: "Create Problem",
};

const Page = () => <CreateProblemForm />;

export { metadata };
export default Page;
