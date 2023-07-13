import type { ReactNode } from "react";

const Layout = ({ children, photosModal }: { children: ReactNode; photosModal: ReactNode }) => (
  <>
    {children}
    {photosModal}
  </>
);

export default Layout;
