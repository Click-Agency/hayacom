import { useTranslation } from "react-i18next";
import moneyIcon from "../../../assets/svgs/money-icon.svg";
import peopleIcon from "../../../assets/svgs/people-icon.svg";
import SectionHeader from "../../shared/SectionHeader";
import { trim } from "../../../utils/functions/general";
import { ReactNode } from "react";
import { Package } from "../../../types/packages";

const PricesBox = ({
  title,
  number,
  className,
  icon,
  tag: Tag = "div",
  children,
}: {
  title?: string;
  number?: number;
  icon?: string;
  tag?: "div" | "li";
  className?: string;
  children?: ReactNode;
}) => (
  <Tag
    className={trim(`
      flex
      flex-col
      justify-center
      items-center
      text-center
      p-4
      box-border
      w-full
      h-full
      md:w-16
      md:h-16
      max-w-16
      max-h-16
      ${className}`)}
  >
    {icon && <img src={icon} alt="icon" className="w-full max-w-10" />}

    {(title || number) && (
      <>
        <h5 className="text-primary text-responsive-2md font-bold">{number}</h5>
        <h6 className="text-responsive-3xs">{title}</h6>
      </>
    )}

    {children}
  </Tag>
);

const PriceRow = ({
  prices,
  title,
  target,
  icon,
  dir,
}: {
  prices: Package["prices"];
  title: string;
  icon: string;
  dir?: boolean;
  target: "guests" | "price";
}) => (
  <div
    className={trim(`
      flex
      flex-col
      md:flex-row
      justify-center`)}
  >
    <PricesBox
      icon={icon}
      className={`
        ${dir ? "md:border-r-2" : "md:border-l-2"}
        border-b-2
        md:border-b-0`}
    />

    <ul
      className={trim(`
        inline-flex
        flex-col
        md:flex-row
        items-center
        justify-center`)}
    >
      {prices.map((price, i) => (
        <PricesBox
          tag="li"
          key={i}
          title={title}
          className={`${
            i < prices.length - 1
              ? `
                ${dir ? "md:border-r-2" : "md:border-l-2"}
                md:border-b-0 
                border-b-2`
              : ""
          }`}
          number={price[target]}
        />
      ))}
    </ul>
  </div>
);

const Prices = ({ prices }: { prices: Package["prices"] }) => {
  const { t, i18n } = useTranslation(["home"]);

  return (
    <div
      className={trim(`
        flex
        flex-col
        gap-4
        items-center
        justify-center
        mb-10`)}
    >
      <SectionHeader
        tag="h3"
        title={t("packages.prices.title")}
        className={trim(`
          text-responsive-2md
          !font-bold
          pb-0`)}
      />

      <div
        className={trim(`
          flex
          md:flex-col
          md:items-center
          justify-center`)}
      >
        <PriceRow
          prices={prices}
          title={t("packages.prices.guest")}
          target={"guests"}
          icon={peopleIcon}
          dir={i18n.dir() === "ltr"}
        />

        <hr className="md:w-full md:h-0.5 h-full w-0.5 bg-gray-200" />

        <PriceRow
          prices={prices}
          title={t("packages.prices.currency")}
          target={"price"}
          icon={moneyIcon}
          dir={i18n.dir() === "ltr"}
        />
      </div>
    </div>
  );
};

export default Prices;
