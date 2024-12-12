import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import getClasses, { formatClasses } from "./classes";

const Input = forwardRef(
  (
    {
      className = "",
      id,
      elemType,
      border,
      error,
      tagSize,
      transparent,
      display,
      svgIcon,
      iconLeft,
      customInputElement,
      ...attributes
    }: {
      className?: string;
      id?: string;
      elemType?: "input" | "textarea";
      error?: string;
      tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
      border?: boolean;
      display?: string;
      transparent?: boolean;
      svgIcon?: JSX.Element;
      iconLeft?: boolean;
      customInputElement?: (classes: {
        tagClasses: string;
        inputClasses: string;
        textareaClasses: string;
      }) => ReactNode;
    } & InputHTMLAttributes<HTMLElement>,
    ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const tagClasses = getClasses("tag", {
      border,
      error,
      tagSize,
      transparent,
    });
    const inputClasses = getClasses("input", { tagSize });
    const textareaClasses = getClasses("textarea", {
      tagSize,
    });

    if (typeof customInputElement === "function")
      return customInputElement({ tagClasses, inputClasses, textareaClasses });

    return elemType === "input" ? (
      <input
        ref={ref as ForwardedRef<HTMLInputElement>}
        className={formatClasses(`
        ${tagClasses}
        ${inputClasses}
        ${className}`)}
        id={id}
        placeholder=" "
        {...attributes}
      />
    ) : (
      <textarea
        ref={ref as ForwardedRef<HTMLTextAreaElement>}
        className={formatClasses(`
        ${tagClasses}
        ${textareaClasses}
        ${className}`)}
        id={id}
        placeholder=" "
        {...attributes}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
