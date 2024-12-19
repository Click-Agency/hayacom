import { cloneElement } from "react";

const trim = (className: string): string =>
  className.replace(/\s+/g, " ").trim();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const pascalCase = (fullString: string): string =>
  fullString
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const addAttributesToReactNode = (
  element: JSX.Element,
  attributes?: React.HTMLAttributes<HTMLOrSVGElement>
) => cloneElement(element, attributes);

export { trim, formatDate, addAttributesToReactNode, pascalCase };
