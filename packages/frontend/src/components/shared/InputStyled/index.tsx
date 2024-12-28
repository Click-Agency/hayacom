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
import SvgIcon from "./components/SvgIcon";

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
      svgIcon,
      errorClassName = "",
      inputContainerClassName = "",
      contianerClassName = "",
      customInputElement,
      svgIconClassName = "",
      iconLeft,
      ...attributes
    }: {
      className?: string;
      id?: string;
      label?: string;
      border?: boolean;
      transparent?: boolean;
      labelClassName?: string;
      svgIcon?: JSX.Element;
      error?: string;
      tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
      elemType?: "input" | "textarea";
      errorClassName?: string;
      svgIconClassName?: string;
      inputContainerClassName?: string;
      contianerClassName?: string;
      iconLeft?: boolean;
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
          svgIcon={svgIcon}
          tagSize={tagSize}
          transparent={transparent}
          customInputElement={customInputElement}
          {...attributes}
        />

        {svgIcon && (
          <SvgIcon
            svgIcon={svgIcon}
            svgIconClassName={svgIconClassName}
            iconLeft={iconLeft}
            tagSize={tagSize}
            error={error}
          />
        )}
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
