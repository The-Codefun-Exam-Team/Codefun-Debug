import type { Metadata } from "next";
import { Suspense } from "react";

import { Editor, InfoTable } from "@/features/problems";

export const metadata: Metadata = {
  title: "Problem",
};

const Page = async ({ params: { pid: code } }: { params: { pid: string } }) => {
  Promise.all([Editor.preload(code), InfoTable.preload(code)]);

  return (
    <div className="mx-auto flex w-full flex-col items-start gap-6 self-stretch px-3 py-5 md:max-w-7xl md:flex-row md:gap-4 md:px-2 md:py-10 lg:gap-8 lg:px-4">
      <div className="h-auto w-full md:flex-[1_1_0]">
        <InfoTable code={code} />
      </div>
      <div className="flex size-full md:flex-[2_2_0]">
        <Suspense fallback={<div className="pb-4 pt-5 text-center text-2xl">Loading...</div>}>
          <Editor code={code} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
