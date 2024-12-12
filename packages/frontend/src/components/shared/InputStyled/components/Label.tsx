import getClasses, { formatClasses } from "./classes";

const Label = ({
  label,
  id,
  labelClassName = "",
  tagSize,
  error,
}: {
  label?: string;
  id?: string;
  labelClassName?: string;
  error?: string;
  tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
}) => {
  const classes = getClasses("label", { tagSize, error });

  return (
    <label
      htmlFor={id}
      className={formatClasses(`
        ${classes}
        ${labelClassName}`)}
    >
      {label}
    </label>
  );
};

export default Label;
