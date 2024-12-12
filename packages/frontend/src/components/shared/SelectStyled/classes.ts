import variables from "./variables";

const { bgSelect, borderSelect, labelColor, selectColor, svgColor } = variables;

const formatClasses = (className: string): string =>
  className.replace(/\s+/g, " ").trim();

const getClasses = (
  target: "label" | "select" | "svgIcon" | "error",
  {
    tagSize,
    disabled,
    error,
  }: {
    tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
    disabled?: boolean;
    error?: string;
  }
) => {
  const classes = {
    label: `font-semibold
            ${tagSize === "xs" ? "text-sm" : ""}
            ${tagSize === "sm" ? "text-md" : ""}
            ${tagSize === "md" ? "text-lg" : ""}
            ${tagSize === "lg" ? "text-xl" : ""}
            ${tagSize === "xl" ? "text-2xl" : ""}
            ${error ? "text-red-500" : labelColor}`,

    select: `appearance-none
              w-[inherit]
              rounded-lg 
              box-border
              border-none
              focus:outline-none
              focus:ring
              group
              ${bgSelect}
              ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
              ${tagSize === "xs" ? "px-1 py-0 pr-6" : ""}
              ${tagSize === "sm" ? "px-2 py-1 pr-8" : ""}
              ${tagSize === "md" ? "px-3 py-2 pr-10" : ""}
              ${tagSize === "lg" ? "px-4 py-3 pr-12" : ""}
              ${tagSize === "xl" ? "px-5 py-4 pr-14" : ""}
              ${error ? "text-red-500" : selectColor}
              ${error ? "focus:ring-red-500" : borderSelect}`,

    svgIcon: `absolute
              inset-y-0
              my-auto
              right-3
              pointer-events-none
              ${tagSize === "xs" ? "w-1 stroke-[1rem]" : ""}
              ${tagSize === "sm" ? "w-2 stroke-[1.5rem]" : ""}
              ${tagSize === "md" ? "w-3 stroke-[2rem]" : ""}
              ${tagSize === "lg" ? "w-4 stroke-[2.5rem]" : ""}
              ${tagSize === "xl" ? "w-5 stroke-[3rem]" : ""}
              ${error ? "fill-red-500 stroke-red-500" : svgColor}`,

    error: `text-rose-500 
            font-semibold
            ${tagSize === "xs" ? "text-xs" : ""}
            ${tagSize === "sm" ? "text-sm" : ""}
            ${tagSize === "md" ? "text-md" : ""}
            ${tagSize === "lg" ? "text-lg" : ""}
            ${tagSize === "xl" ? "text-xl" : ""}`,
  };
  return classes[target];
};

export default getClasses;
export { formatClasses };
