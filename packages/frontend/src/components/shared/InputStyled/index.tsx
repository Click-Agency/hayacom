"use client";

import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import Label from "./components/Label";
import Input from "./components/Input";
import Error from "./components/Error";

import { formatClasses } from "./components/classes";
import styles from "./input-styles.module.css";

const InputStyled = forwardRef(
  (
    {
      className = "",
      labelClassName = "",
      id,
      label,
      border,
      error,
      tagSize = "md",
      elemType = "input",
      transparent,
      errorClassName = "",
      inputContainerClassName = "",
      contianerClassName = "",
      customInputElement,
      ...attributes
    }: {
      className?: string;
      id?: string;
      label?: string;
      border?: boolean;
      transparent?: boolean;
      labelClassName?: string;
      error?: string;
      tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
      elemType?: "input" | "textarea";
      errorClassName?: string;
      inputContainerClassName?: string;
      contianerClassName?: string;
      customInputElement?: (classes: {
        tagClasses: string;
        inputClasses: string;
        textareaClasses: string;
      }) => ReactNode;
    } & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  ) => (
    <div
      className={formatClasses(`
        ${styles.contianerClassName}
        ${contianerClassName}`)}
    >
      {label && (
        <Label
          id={id}
          label={label}
          labelClassName={labelClassName}
          tagSize={tagSize}
          error={error}
        />
      )}

      <div
        className={formatClasses(`
          ${styles.inputContainerClassName}
          ${inputContainerClassName}`)}
      >
        <Input
          ref={ref}
          border={border}
          className={className}
          elemType={elemType}
          error={error}
          id={id}
          tagSize={tagSize}
          transparent={transparent}
          customInputElement={customInputElement}
          {...attributes}
        />
      </div>

      {error && (
        <Error
          error={error}
          errorClassName={errorClassName}
          tagSize={tagSize}
        />
      )}
    </div>
  )
);

InputStyled.displayName = "InputStyled";

export default InputStyled;
