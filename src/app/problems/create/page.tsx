import type { Metadata } from "next";

import { CreateProblemForm } from "@/features/problems";

export const metadata: Metadata = {
  title: "Create Problem",
};

const Page = () => (
  <div className="flex w-full items-center justify-center self-stretch">
    <CreateProblemForm />
  </div>
);

export default Page;
