import { GoTrash } from "react-icons/go";
import { Package } from "../../../../types/packages";
import { formatDate, trim } from "../../../../utils/functions/general";
import ButtonStyled from "../../../shared/ButtonStyled";
import { appRoutes } from "../../../../config";
import { CiEdit } from "react-icons/ci";
import moneyIcon from "../../../../assets/svgs/money-icon.svg";
import peopleIcon from "../../../../assets/svgs/people-icon.svg";

const TableRow = ({
  _id,
  name,
  title,
  items,
  createdAt,
  packages,
  prices,
  i = 0,
  dir = "ltr",
  onDeleteHandler,
}: {
  _id: string;
  name: string;
  title: string;
  items: string[];
  createdAt: string;
  packages: Package[];
  prices: Package["prices"];
  onDeleteHandler: any;
  dir?: "ltr" | "rtl";
  i?: number;
}) => (
  <tr key={i} className={`text-center`}>
    <td
      className={trim(`
        h-4
        break-all
        max-w-40
        min-w-20
        p-0
        ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
        ${i !== packages?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
    >
      <div
        className={trim(`
            bg-white
            w-full
            h-full
            p-2
            flex
            items-center
            justify-center
            ${
              i === 0
                ? dir === "rtl"
                  ? "rounded-tr-xl shadow-tr"
                  : "rounded-tl-xl shadow-tl"
                : ""
            }
            ${
              i === packages?.length - 1
                ? dir === "rtl"
                  ? "rounded-br-xl shadow-br"
                  : "rounded-bl-xl shadow-bl"
                : ""
            }`)}
      >
        {_id}
      </div>
    </td>
    <td
      className={trim(`
          h-1
          p-0
          ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
          ${i !== packages?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
    >
      <div
        className={trim(`
            bg-white
            w-full
            h-full
            p-2
            flex
            items-center
            justify-center
            ${dir === "rtl" ? "border-r border-r-gray-300" : "border-l border-l-gray-300"}
            ${i === 0 ? "shadow-t" : ""}
            ${i === packages?.length - 1 ? "shadow-b" : ""}`)}
      >
        {name}
      </div>
    </td>
    <td
      className={trim(`
          h-1
          p-0
          ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
          ${i !== packages?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
    >
      <div
        className={trim(`
            bg-white
            w-full
            h-full
            p-2
            flex
            items-center
            justify-center
            ${dir === "rtl" ? "border-r border-r-gray-300" : "border-l border-l-gray-300"}
            ${i === 0 ? "shadow-t" : ""}
            ${i === packages?.length - 1 ? "shadow-b" : ""}`)}
      >
        {title}
      </div>
    </td>
    <td
      className={trim(`
          h-1
          p-0
          min-w-96
          ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
          ${i !== packages?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
    >
      <ol
        className={trim(`
            list-decimal
            list-inside
            text-start
            text-primary
          bg-white
            w-full
            h-full
            p-2
            flex
            flex-col
            items-start
            justify-start
            gap-2
            ${dir === "rtl" ? "border-r border-r-gray-300" : "border-l border-l-gray-300"}
            ${i === 0 ? "shadow-t" : ""}
            ${i === packages?.length - 1 ? "shadow-b" : ""}`)}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </td>
    <td
      className={trim(`
          h-1
          p-0
          ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
          ${i !== packages?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
    >
      <div
        className={trim(`
            bg-white
            w-full
            h-full
            p-2
            flex
            items-center
            justify-center
            flex-wrap
            gap-6
            min-w-52
            ${dir === "rtl" ? "border-r border-r-gray-300" : "border-l border-l-gray-300"}
            ${i === 0 ? "shadow-t" : ""}
            ${i === packages?.length - 1 ? "shadow-b" : ""}`)}
      >
        {prices.map((price, i) => (
          <div className="flex gap-2 items-center" key={i}>
            <div className="flex gap-1 items-center">
              <img src={peopleIcon} alt="people" className="w-5 h-5" />
              <span key={i}>{price.guests}</span>
            </div>

            <hr className="h-7 w-1 bg-primary" />

            <div className="flex gap-1 items-center">
              <img src={moneyIcon} alt="money" className="w-5 h-5" />
              <span key={i}>{price.price}</span>
            </div>
          </div>
        ))}
      </div>
    </td>
    <td
      className={trim(`
          h-1
          p-0
          ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
          ${i !== packages?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
    >
      <div
        className={trim(`
            bg-white
            w-full
            h-full
            p-2
            flex
            items-center
            justify-center
            text-nowrap
            ${dir === "rtl" ? "border-r border-r-gray-300" : "border-l border-l-gray-300"}
            ${i === 0 ? "shadow-t" : ""}
            ${i === packages?.length - 1 ? "shadow-b" : ""}`)}
      >
        {formatDate(createdAt)}
      </div>
    </td>
    <td
      className={trim(`
          h-1
          p-0
          ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
          ${i !== packages?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
    >
      <div
        className={trim(`
            bg-white
            w-full
            h-full
            p-2
            flex
            gap-4
            items-center
            justify-center
            flex-col
            ${dir === "rtl" ? "border-r border-r-gray-300" : "border-l border-l-gray-300"}
            ${
              i === 0
                ? dir === "rtl"
                  ? "rounded-tl-xl shadow-tl"
                  : "rounded-tr-xl shadow-tr"
                : ""
            }
            ${
              i === packages?.length - 1
                ? dir === "rtl"
                  ? "shadow-bl rounded-bl-xl"
                  : "shadow-br rounded-bl-xr"
                : ""
            }`)}
      >
        <ButtonStyled
          onClick={() => onDeleteHandler(_id, name)}
          size="custom"
          className={`
              hover:text-red-500
              active:scale-95`}
          SvgIcon={<GoTrash size={23} />}
        />

        <ButtonStyled
          size="custom"
          href={`${appRoutes.editPackage}/${_id}`}
          className={`
            hover:text-orange-400
            active:scale-95`}
          SvgIcon={<CiEdit size={23} />}
        />
      </div>
    </td>
  </tr>
);

export default TableRow;
