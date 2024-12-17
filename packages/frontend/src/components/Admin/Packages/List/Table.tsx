import { Dispatch, SetStateAction } from "react";
import { Package } from "../../../../types/packages";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../../utils/functions/general";

const Table = ({
  setQuery,
  packages,
  meta,
}: {
  setQuery: Dispatch<
    SetStateAction<{
      page: number;
      limit: number;
    }>
  >;
  packages?: Package[];
  meta?: {
    itemCount: number;
    limit: number;
    page: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    pageCount: number;
  };
}) => {
  const { t, i18n } = useTranslation(["admin"]);

  const headers = Object.values(
    t("packages.list.table.headers", { returnObjects: true })
  );

  const actionsBtns = (
    <td>
      <button>{t("packages.list.table.actions.edit")}</button>
      <button>{t("packages.list.table.actions.delete")}</button>
    </td>
  );

  const arBodyArr = packages?.map(
    ({ _id, nameAr, titleAr, itemsAr, createdAt }, i) => (
      <tr key={i}>
        <td>{_id}</td>
        <td>{nameAr}</td>
        <td>{titleAr}</td>
        <td>{itemsAr}</td>
        <td>{formatDate(createdAt)}</td>
        {actionsBtns}
      </tr>
    )
  );

  const enBodyArr = packages?.map(
    ({ _id, nameEn, titleEn, itemsEn, createdAt }, i) => (
      <tr key={i}>
        <td>{_id}</td>
        <td>{nameEn}</td>
        <td>{titleEn}</td>
        <td>{itemsEn}</td>
        <td>{formatDate(createdAt)}</td>
        {actionsBtns}
      </tr>
    )
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{i18n.language === "ar" ? arBodyArr : enBodyArr}</tbody>
      </table>
    </div>
  );
};

export default Table;
