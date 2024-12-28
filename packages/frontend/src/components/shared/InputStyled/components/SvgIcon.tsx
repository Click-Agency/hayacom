"use client";

import getClasses, { addAttributesToReactNode, formatClasses } from "./classes";

const SvgIcon = ({
  svgIcon,
  svgIconClassName = "",
  iconLeft,
  tagSize,
  error,
}: {
  svgIcon: JSX.Element;
  svgIconClassName?: string;
  iconLeft?: boolean;
  tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  error?: string;
}) => {
  const svgIconClasses = getClasses("svgIcon", { iconLeft, tagSize, error });

  return addAttributesToReactNode(svgIcon, {
    className: formatClasses(`
        ${svgIconClasses} 
        ${svgIconClassName}`),
  });
};

export default SvgIcon;
