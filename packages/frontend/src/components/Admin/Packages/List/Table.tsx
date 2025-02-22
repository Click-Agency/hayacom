import { Package } from "../../../../types/packages";
import { useTranslation } from "react-i18next";
import { trim } from "../../../../utils/functions/general";
import useScrollInToView from "../../../../hooks/useScrollInToView";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../store/slices/deleteSlice";
import { deletePackage } from "../../../../api/routes/packages";
import TableRow from "./TableRow";

const Table = ({ packages }: { packages?: Package[] }) => {
  const { t, i18n } = useTranslation(["admin"]);
  const { targetRef, isInView } = useScrollInToView();

  const dispatch = useDispatch();

  const onDeleteHandler = (uniqueId: string, uniqueIdentifier: string) => {
    dispatch(
      showDialog({
        uniqueId,
        uniqueIdentifier,
        type: t("packages.titleId"),
        deleteFunction: deletePackage,
      })
    );
  };

  const headers = Object.values(
    t("packages.list.table.headers", { returnObjects: true })
  );

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
        <thead>
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
        <tbody className="text-gray-500">
          {packages ? (
            i18n.language === "ar" ? (
              packages.map(
                ({ _id, nameAr, titleAr, itemsAr, createdAt, prices }, i) => (
                  <TableRow
                    key={i}
                    _id={_id}
                    name={nameAr}
                    title={titleAr}
                    items={itemsAr}
                    prices={prices}
                    createdAt={createdAt}
                    packages={packages}
                    onDeleteHandler={onDeleteHandler}
                    i={i}
                    dir="rtl"
                  />
                )
              )
            ) : (
              packages.map(
                ({ _id, nameEn, titleEn, itemsEn, createdAt, prices }, i) => (
                  <TableRow
                    key={i}
                    _id={_id}
                    name={nameEn}
                    title={titleEn}
                    items={itemsEn}
                    createdAt={createdAt}
                    prices={prices}
                    packages={packages}
                    onDeleteHandler={onDeleteHandler}
                    i={i}
                    dir="ltr"
                  />
                )
              )
            )
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="pt-16 pb-12 text-primary text-responsive-md"
              >
                {t("packages.noPackages")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
