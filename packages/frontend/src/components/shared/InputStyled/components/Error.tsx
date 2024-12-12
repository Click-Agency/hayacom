"use client";

import getClasses, { formatClasses } from "./classes";

const Error = ({
  error,
  errorClassName = "",
  tagSize,
}: {
  error: string;
  errorClassName?: string;
  tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
}) => {
  const classes = getClasses("error", { tagSize });

  return (
    <p
      className={formatClasses(`
        ${classes}
        ${errorClassName}`)}
    >
      {error}
    </p>
  );
};

export default Error;
