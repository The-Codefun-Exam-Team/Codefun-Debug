import type { Metadata } from "next";

import { Box, Heading } from "@/components";
import { getSubmission, InfoTable, RunInfo } from "@/features/submissions";

// export const generateStaticParams = () => [];

export const metadata: Metadata = {
  title: "Submissions",
};

const Page = async ({ params: { sid } }: { params: { sid: string } }) => {
  const submissionData = await getSubmission(sid);

  if (!submissionData.ok) {
    return (
      <div className="flex size-full items-center justify-center self-center">
        <Box>
          <Heading type="display">Failed to fetch submission.</Heading>
          <Heading type="title-large">Error: {submissionData.error}</Heading>
          <Heading type="title-large">Maybe try refreshing?</Heading>
        </Box>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full flex-col items-start gap-6 self-stretch px-3 py-5 md:max-w-7xl md:flex-row md:gap-4 md:px-2 md:py-10 lg:gap-8 lg:px-4">
      <div className="h-auto w-full flex-[1_1_0]">
        <InfoTable {...submissionData} />
      </div>
      <div className="flex size-full flex-[2_2_0] flex-col gap-2">
        <RunInfo {...submissionData} />
      </div>
    </div>
  );
};

export default Page;
