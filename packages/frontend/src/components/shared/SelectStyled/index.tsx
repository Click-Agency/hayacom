"use client";

import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import getClasses, { formatClasses } from "./classes";

const ArrowDownIcon = ({
  targetRef,
  ...attributes
}: {
  targetRef?: React.RefObject<SVGSVGElement>;
} & React.HTMLAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 330 330"
    ref={targetRef}
    {...attributes}
  >
    <path d="M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0 0 21.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z" />
  </svg>
);

const SelectStyled = forwardRef(
  (
    {
      options = [
        {
          label: "",
          value: "",
        },
      ],
      label,
      defaultText,
      defaultValue = "",
      error,
      disabled,
      SvgIcon,
      tagSize = "md",
      className,
      labelClassName,
      svgIconClassName,
      errorClassName,
      ...atribuites
    }: {
      options: {
        label: string;
        value: string;
      }[];
      disabled?: boolean;
      label?: string;
      defaultText?: string;
      defaultValue?: string;
      error?: string;
      className?: string;
      labelClassName?: string;
      svgIconClassName?: string;
      errorClassName?: string;
      tagSize?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
      SvgIcon?: ReactNode;
    } & SelectHTMLAttributes<HTMLElement>,
    ref: ForwardedRef<HTMLSelectElement>
  ) => (
    <label className="flex w-full flex-col gap-2">
      {label && (
        <h3
          className={formatClasses(`
            ${getClasses("label", { tagSize, error })}
            ${labelClassName}`)}
        >
          {label}
        </h3>
      )}
      <div className="w-full relative">
        <select
          ref={ref}
          className={formatClasses(`
            ${getClasses("select", { tagSize, error, disabled })}
            ${className}`)}
          defaultValue={defaultValue}
          disabled={disabled}
          {...atribuites}
        >
          (
          <option
            className={`${defaultText ? "" : "hidden"}`}
            value=""
            disabled
          >
            {defaultText}
          </option>
          )
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {SvgIcon ? (
          SvgIcon
        ) : (
          <ArrowDownIcon
            className={formatClasses(`
              ${getClasses("svgIcon", { tagSize, error })}
              ${svgIconClassName}`)}
          />
        )}
      </div>
      <p
        className={formatClasses(`
          ${getClasses("error", { tagSize, error })}
          ${errorClassName}`)}
      >
        {error}
      </p>
    </label>
  )
);

SelectStyled.displayName = "SelectStyled";

export default SelectStyled;
