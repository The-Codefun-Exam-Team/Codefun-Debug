import { clsx } from "@utils/shared";

import { NavLinks } from "./NavLinks";

export const DropDownToggler = () => (
  <>
    <input type="checkbox" id="dropdown-check" className="peer hidden" />
    <label
      htmlFor="dropdown-check"
      className={clsx(
        "float-right mr-4 inline-block h-9 w-10 cursor-pointer leading-[12px] md:hidden",
        "peer-checked:[&>:nth-child(1)]:translate-x-[6.2px]",
        "peer-checked:[&>:nth-child(1)]:translate-y-[-3px]",
        "peer-checked:[&>:nth-child(1)]:rotate-45",
        "peer-checked:[&>:nth-child(2)]:w-1",
        "peer-checked:[&>:nth-child(2)]:opacity-0",
        "peer-checked:[&>:nth-child(3)]:translate-x-[6px]",
        "peer-checked:[&>:nth-child(3)]:rotate-[-45deg]",
      )}
    >
      <span className="inline-block h-[5px] w-full origin-top-left rounded-md bg-slate-800 align-middle transition-all duration-300 ease-out-back" />
      <span className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle transition-all duration-200 ease-out" />
      <span className="inline-block h-[5px] w-full origin-bottom-left rounded-md bg-slate-800 align-middle transition-all duration-300 ease-out-back" />
    </label>
  </>
);

export const DropDownContent = () => {
  return (
    <>
      <div
        className={clsx(
          "flex w-full origin-top flex-col overflow-hidden px-3 transition-all duration-150 ease-linear",
          "md:hidden md:peer-checked:hidden",
          "[&>*]:cursor-pointer [&>*]:py-2 [&>*]:pl-10 [&>*]:font-medium [&>:first-child]:mt-3",
          "max-h-0 peer-checked:max-h-[min(252px,70vh)] peer-checked:overflow-y-auto",
        )}
      >
        <NavLinks keyPrefix="navbar-dropdown" />
      </div>
    </>
  );
};
