import { ImgHTMLAttributes } from "react";
import logo from "/vite.svg?url";
import { trim } from "../../utils/functions/general";

const Logo = ({
  className = "",
  ...attributes
}: { className?: string } & ImgHTMLAttributes<HTMLElement>) => {
  return (
    <img
      src={logo}
      alt="logo"
      className={trim(`
        animate-appear
        max-w-[50px]
        ${className}`)}
      {...attributes}
    />
  );
};

export default Logo;
