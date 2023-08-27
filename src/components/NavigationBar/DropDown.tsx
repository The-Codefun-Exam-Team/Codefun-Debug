import { clsx } from "@utils/shared";

import { VerticalNavLinks } from "./NavLinks";

export const DropDownToggler = () => (
  <>
    <input type="checkbox" id="dropdown-check" className="peer hidden" />
    <label
      htmlFor="dropdown-check"
      className={clsx(
        "relative top-1 float-left h-8 w-8 cursor-pointer leading-[10px] md:hidden",
        "peer-checked:[&>:nth-child(1)]:translate-y-[10px]",
        "peer-checked:[&>:nth-child(1)]:rotate-45",
        "peer-checked:[&>:nth-child(2)]:w-1",
        "peer-checked:[&>:nth-child(2)]:opacity-0",
        "peer-checked:[&>:nth-child(3)]:translate-y-[-10px]",
        "peer-checked:[&>:nth-child(3)]:rotate-[-45deg]",
      )}
    >
      <span className="inline-block h-[4px] w-full origin-center rounded-md bg-slate-800 align-middle transition-all duration-300 ease-out-back" />
      <span className="inline-block h-[4px] w-full rounded-md bg-slate-800 align-middle transition-all duration-200 ease-out" />
      <span className="inline-block h-[4px] w-full origin-center rounded-md bg-slate-800 align-middle transition-all duration-300 ease-out-back" />
    </label>
  </>
);

export const DropDownContent = () => {
  return (
    <>
      <div
        className={clsx(
          "flex w-full shrink-0 origin-top flex-col px-3 transition-all duration-200 ease-in-out",
          "md:hidden md:peer-checked:hidden ",
          "[&>*]:cursor-pointer [&>*]:py-1 [&>*]:font-medium [&>:first-child]:mt-3",
          "max-h-0 overflow-hidden peer-checked:max-h-[163px]",
        )}
      >
        <VerticalNavLinks keyPrefix="navbar-dropdown" />
      </div>
    </>
  );
};
