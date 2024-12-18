import { Package } from "../../../../types/packages";
import { useTranslation } from "react-i18next";
import { formatDate, trim } from "../../../../utils/functions/general";
import ButtonStyled from "../../../shared/ButtonStyled";
import useScrollInToView from "../../../../hooks/useScrollInToView";
import { appRoutes } from "../../../../config";

const Table = ({ packages }: { packages?: Package[] }) => {
  const { t, i18n } = useTranslation(["admin"]);
  const { targetRef, isInView } = useScrollInToView();

  const headers = Object.values(
    t("packages.list.table.headers", { returnObjects: true })
  );

  const arBodyArr = packages?.map(
    ({ _id, nameAr, titleAr, itemsAr, createdAt }, i) => (
      <tr key={i} className="text-center">
        <td
          className={trim(`
            break-all
            p-2
            border-b
            border-r
            border-primary
            max-w-40
            min-w-20`)}
        >
          {_id}
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary`)}
        >
          {nameAr}
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary`)}
        >
          {titleAr}
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary
            min-w-96`)}
        >
          <ol className="list-decimal list-inside space-y-2 text-start">
            {itemsAr.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary
            text-nowrap`)}
        >
          {formatDate(createdAt)}
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary
            space-y-2`)}
        >
          <ButtonStyled
            ripple
            size="sm"
            href={`${appRoutes.editPackage}/${_id}`}
            className={trim(`
              w-full
              rounded-xl
              hover:scale-105
              active:scale-95`)}
            warning
            title={t("packages.list.table.actions.edit")}
          />
          <ButtonStyled
            ripple
            size="sm"
            className={trim(`
              w-full
              rounded-xl
              hover:scale-105
              active:scale-95`)}
            danger
            title={t("packages.list.table.actions.delete")}
          />
        </td>
      </tr>
    )
  );

  const enBodyArr = packages?.map(
    ({ _id, nameEn, titleEn, itemsEn, createdAt }, i) => (
      <tr key={i} className="text-center">
        <td
          className={trim(`
            break-all
            p-2
            border-b
            border-r
            border-primary
            max-w-40
            min-w-20`)}
        >
          {_id}
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary`)}
        >
          {nameEn}
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary`)}
        >
          {titleEn}
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary
            min-w-96`)}
        >
          <ol className="list-decimal list-inside space-y-2 text-start">
            {itemsEn.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary
            text-nowrap`)}
        >
          {formatDate(createdAt)}
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary
            space-y-2`)}
        >
          <ButtonStyled
            ripple
            size="sm"
            href={`${appRoutes.editPackage}/${_id}`}
            className={trim(`
              w-full
              rounded-xl
              hover:scale-105
              active:scale-95`)}
            warning
            title={t("packages.list.table.actions.edit")}
          />
          <ButtonStyled
            ripple
            size="sm"
            className={trim(`
              w-full
              rounded-xl
              hover:scale-105
              active:scale-95`)}
            danger
            title={t("packages.list.table.actions.delete")}
          />
        </td>
      </tr>
    )
  );

  return (
    <div className="!overflow-x-auto w-full">
      <table
        ref={targetRef}
        className={trim(`
          w-full 
          text-center 
          border-collapse 
          border 
          border-primary 
          rounded-xl
          text-primary 
          font-medium
          transition-all
          duration-500
          ease-in-out
          ${isInView ? "opacity-100" : "opacity-0"}`)}
      >
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className={trim(`
                  p-4
                  border
                  border-primary
                  bg-primary
                  text-background-primary`)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{i18n.language === "ar" ? arBodyArr : enBodyArr}</tbody>
      </table>
    </div>
  );
};

export default Table;
