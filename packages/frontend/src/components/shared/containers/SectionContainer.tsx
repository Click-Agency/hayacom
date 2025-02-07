import { trim } from "../../../utils/functions/general";
import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";

const SectionContainer = forwardRef(
  (
    {
      children,
      className = "",
      wraperClassName = "",
      Background,
      ...attributes
    }: Readonly<{
      children: ReactNode;
      className?: string;
      wraperClassName?: string;
      Background?: ReactNode;
    }> &
      HTMLAttributes<HTMLElement>,
    ref: ForwardedRef<HTMLElement>
  ) => (
    <section
      id="section-container"
      ref={ref}
      className={trim(` 
        flex
        w-full
        flex-col
        box-border
        mb-16
        ${className}`)}
      {...attributes}
    >
      {Background}
      <div
        id="section-wrapper"
        className={trim(`
          flex
          flex-col
          w-full
          2xl:w-[70%]
          xl:w-[90%]
          lg:container
          containerPadding
          ${wraperClassName}`)}
      >
        {children}
      </div>
    </section>
  )
);

export default SectionContainer;
