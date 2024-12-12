import { trim } from "../../../utils/functions/general";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";

const PageContainer = ({
  children,
  className = "",
  paddingTop,
  ...attributes
}: Readonly<{
  children: ReactNode;
  paddingTop?: boolean;
  className?: string;
}> &
  HTMLAttributes<HTMLElement>) => {
  const [heights, setHeights] = useState({
    headerHeight: 0,
    footerHeight: 0,
    headerfloat: false,
    footerfloat: false,
  });

  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    if (!header || !footer) return;

    const headerStyles = window.getComputedStyle(header);

    if (
      headerStyles.position === "absolute" ||
      headerStyles.position === "fixed"
    ) {
      setHeights((prev) => ({
        ...prev,
        headerfloat: true,
      }));
    }

    const footerStyles = window.getComputedStyle(footer);

    if (
      footerStyles.position === "absolute" ||
      footerStyles.position === "fixed"
    ) {
      setHeights((prev) => ({
        ...prev,
        footerfloat: true,
      }));
    }

    setHeights((prev) => ({
      ...prev,
      headerHeight: header.offsetHeight,
      footerHeight: footer.offsetHeight,
    }));
  }, []);

  return (
    <main
      className={trim(`
        flex
        flex-col
        w-full
        h-full
        ${className}`)}
      style={{
        paddingBottom:
          (heights.footerfloat && heights.footerHeight) || undefined,

        paddingTop:
          (paddingTop && heights.headerfloat && heights.headerHeight) ||
          undefined,

        minHeight: `calc(100vh - ${
          heights.headerHeight
          // + heights.footerHeight
        }px)`,
      }}
      {...attributes}
    >
      {children}
    </main>
  );
};

export default PageContainer;
