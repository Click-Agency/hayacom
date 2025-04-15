import { HTMLAttributes } from "react";
import { trim } from "../../utils/functions/general";

const SectionHeader = ({
  className = "",
  title,
  tag: Tag = "h1",
  ...attributes
}: {
  title: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
} & HTMLAttributes<HTMLHeadElement>) => {
  return (
    <Tag
      className={trim(`
        text-responsive-lg
        text-primary
        font-semibold
        text-center
        pb-14
        ${className}`)}
      {...attributes}
    >
      {title}
    </Tag>
  );
};

export default SectionHeader;
