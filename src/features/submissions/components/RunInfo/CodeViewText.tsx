export const CodeViewText = ({ text }: { text: string }) => (
  <div className="flex h-full w-full">
    <div className="grow-1 flex w-full flex-col justify-around rounded-md border-2 border-slate-500 text-2xl text-slate-700 dark:border-slate-600 dark:text-slate-200">
      <div className="text-center text-3xl">{text}</div>
    </div>
  </div>
);
