import { GoTrash } from "react-icons/go";
import { formatDate, trim } from "../../../../utils/functions/general";
import ButtonStyled from "../../../shared/ButtonStyled";
import { appRoutes } from "../../../../config";
import { CiEdit } from "react-icons/ci";
import { Card } from "../../../../types/cards";

const TableRow = ({
  _id,
  image,
  customId,
  createdAt,
  cards,
  i = 0,
  dir = "ltr",
  onDeleteHandler,
  disableUpdate,
}: {
  _id: string;
  image: string;
  customId: string;
  createdAt: string;
  cards: Card[];
  onDeleteHandler: any;
  dir?: "ltr" | "rtl";
  i?: number;
  disableUpdate?: boolean;
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
        ${i !== cards?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
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
              i === cards?.length - 1
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
          ${i !== cards?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
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
            ${i === cards?.length - 1 ? "shadow-b" : ""}`)}
      >
        <img
          src={image}
          alt={customId}
          className={trim(`
            rounded-xl
            object-cover
            m-auto
            w-32
            h-52
            min-w-32
            min-h-52
            md:rounded-2xl
            md:object-cover`)}
        />
      </div>
    </td>
    <td
      className={trim(`
          h-1
          p-0
          ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
          ${i !== cards?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
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
            ${i === cards?.length - 1 ? "shadow-b" : ""}`)}
      >
        {customId}
      </div>
    </td>
    <td
      className={trim(`
          h-1
          p-0
          ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
          ${i !== cards?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
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
            ${i === cards?.length - 1 ? "shadow-b" : ""}`)}
      >
        {formatDate(createdAt)}
      </div>
    </td>
    <td
      className={trim(`
          h-1
          p-0
          ${i === 0 ? "border-t-transparent border-t-[50px]" : ""}
          ${i !== cards?.length - 1 ? "border-b-2 border-b-gray-300" : ""}`)}
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
              i === cards?.length - 1
                ? dir === "rtl"
                  ? "shadow-bl rounded-bl-xl"
                  : "shadow-br rounded-bl-xr"
                : ""
            }`)}
      >
        <ButtonStyled
          onClick={() => onDeleteHandler(_id, customId)}
          size="custom"
          className={`
              hover:text-red-500
              active:scale-95`}
          SvgIcon={<GoTrash size={23} />}
        />

        {disableUpdate && (
          <ButtonStyled
            size="custom"
            href={`${appRoutes.editCard}/${_id}`}
            className={`
            hover:text-orange-400
            active:scale-95`}
            SvgIcon={<CiEdit size={23} />}
          />
        )}
      </div>
    </td>
  </tr>
);

export default TableRow;
