import { NavLinks } from "./NavLinks";

// TODO: handle loading
export const OptionsList = () => (
  <>
    <div className="text-l my-auto hidden h-min justify-around divide-x-2 divide-gray-500 font-medium lg:flex [&>*]:cursor-pointer [&>*]:px-4">
      <NavLinks keyPrefix="navbar-options-list-large" />
    </div>
    <div className="text-l my-auto hidden h-min justify-around divide-x-2 divide-gray-500 font-medium md:flex lg:hidden [&>*]:cursor-pointer [&>*]:px-4">
      <NavLinks keyPrefix="navbar-options-list-small-mid" />
    </div>
  </>
);
