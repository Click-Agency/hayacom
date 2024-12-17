import { ImgHTMLAttributes } from "react";
import logo from "../../assets/imgs/logo.png";
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
        ${className}`)}
      {...attributes}
    />
  );
};

export default Logo;
