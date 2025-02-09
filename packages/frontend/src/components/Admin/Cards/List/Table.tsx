import { Card } from "../../../../types/cards";
import { useTranslation } from "react-i18next";
import { trim } from "../../../../utils/functions/general";
import useScrollInToView from "../../../../hooks/useScrollInToView";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../store/slices/deleteSlice";
import { deleteCard } from "../../../../api/routes/cards";
import TableRow from "./TableRow";

const Table = ({ cards }: { cards?: Card[] }) => {
  const { t, i18n } = useTranslation(["admin"]);
  const { targetRef, isInView } = useScrollInToView();
  const dispatch = useDispatch();

  const headers = Object.values(
    t("cards.list.table.headers", { returnObjects: true })
  );

  const onDeleteHandler = (uniqueId: string, uniqueIdentifier: string) => {
    dispatch(
      showDialog({
        uniqueId,
        uniqueIdentifier,
        type: t("cards.titleId"),
        deleteFunction: deleteCard,
      })
    );
  };

  return (
    <div className="!overflow-x-auto w-full">
      <table
        ref={targetRef}
        className={trim(`
          w-full 
          text-center
          rounded-xl
          font-medium
          transition-all
          duration-500
          ease-in-out
          border-separate 
          border-spacing-0
          ${isInView ? "opacity-100" : "opacity-0"}`)}
      >
        <thead className="">
          <tr className="text-primary bg-[#A39FA04D]">
            {headers.map((header, i) => (
              <th
                key={i}
                className={trim(`
                p-4
                ${i === 0 ? (i18n.dir() === "ltr" ? "rounded-l-full" : "rounded-r-full") : ""}
                ${i === headers.length - 1 ? (i18n.dir() === "ltr" ? "rounded-r-full" : "rounded-l-full") : ""}`)}
                rowSpan={i} // Adjust the rowSpan value as needed
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {i18n.language === "ar"
            ? cards?.map(({ _id, customIdAr, createdAt, images }, i) => (
                <TableRow
                  key={i}
                  i={i}
                  _id={_id}
                  customId={customIdAr}
                  image={images[0]}
                  createdAt={createdAt}
                  onDeleteHandler={onDeleteHandler}
                  dir="rtl"
                  cards={cards}
                />
              ))
            : cards?.map(({ _id, customIdEn, createdAt, images }, i) => (
                <TableRow
                  key={i}
                  i={i}
                  _id={_id}
                  customId={customIdEn}
                  image={images[0]}
                  createdAt={createdAt}
                  onDeleteHandler={onDeleteHandler}
                  dir="ltr"
                  cards={cards}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
