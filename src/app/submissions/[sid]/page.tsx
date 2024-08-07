import type { Metadata } from "next";

import { getSubmission, InfoTable, RunInfo } from "@/features/submissions";

// export const generateStaticParams = () => [];

export const metadata: Metadata = {
  title: "Submissions",
};

const Page = async ({ params: { sid } }: { params: { sid: string } }) => {
  const submissionId = parseInt(sid);
  const submissionData = await getSubmission(submissionId);

  return (
    <div className="mx-auto flex w-full flex-col items-start gap-6 self-stretch px-3 py-5 md:max-w-7xl md:flex-row md:gap-4 md:px-2 md:py-10 lg:gap-8 lg:px-4">
      <div className="h-auto w-full flex-[1_1_0]">
        {/* <InfoTable data={submissionData} /> */}
      </div>
      <div className="flex size-full flex-[2_2_0] flex-col gap-2">
        {/* <RunInfo data={submissionData} /> */}
      </div>
    </div>
  );
};

export default Page;
