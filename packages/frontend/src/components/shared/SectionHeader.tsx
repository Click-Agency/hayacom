import { HTMLAttributes } from "react";
import { trim } from "../../utils/functions/general";

const SectionHeader = ({
  className = "",
  title,
  ...attributes
}: {
  title: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <h1
      className={trim(`
        text-responsive-lg
        text-primary
        font-semibold
        text-center
        pb-4
        ${className}`)}
      {...attributes}
    >
      {title}
    </h1>
  );
};

export default SectionHeader;
