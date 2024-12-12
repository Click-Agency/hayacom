import { HTMLAttributes, ReactNode } from "react";
import { trim } from "../../utils/functions/general.ts";

const Layout = ({
  children,
  className = "",
  ...attributes
}: Readonly<{
  children: ReactNode;
  className?: string;
}> &
  HTMLAttributes<HTMLElement>) => (
  <div
    id="layout"
    className={trim(`
      grid
      grid-cols-1
      min-h-screen
      min-w-screen
      overflow-x-hidden
      bg-background-secondary
      ${className}`)}
    {...attributes}
  >
    {children}
  </div>
);

export default Layout;
