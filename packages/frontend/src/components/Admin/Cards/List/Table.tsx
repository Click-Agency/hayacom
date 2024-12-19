import { Card } from "../../../../types/cards";
import { useTranslation } from "react-i18next";
import { formatDate, trim } from "../../../../utils/functions/general";
import ButtonStyled from "../../../shared/ButtonStyled";
import useScrollInToView from "../../../../hooks/useScrollInToView";
import { appRoutes } from "../../../../config";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../store/slices/deleteSlice";
import { deleteCard } from "../../../../api/routes/cards";

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

  const arBodyArr = cards?.map(
    ({ _id, image, customIdAr, titleAr, createdAt }, i) => (
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
          <img
            src={image}
            alt={titleAr}
            className={trim(`
              w-20
              h-20
              rounded-xl
              object-cover
              border
              border-primary
              m-auto
              md:w-32
              md:h-32
              md:rounded-2xl
              md:object-cover
              md:border-primary`)}
          />
        </td>
        <td
          className={trim(`
            p-2
            border-b
            border-r
            border-primary`)}
        >
          {customIdAr}
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
            space-y-2
            max-w-16`)}
        >
          <ButtonStyled
            ripple
            size="sm"
            href={`${appRoutes.editCard}/${_id}`}
            className={trim(`
              w-full
              rounded-xl
              hover:scale-105
              active:scale-95`)}
            warning
            title={t("cards.list.table.actions.edit")}
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
            title={t("cards.list.table.actions.delete")}
            onClick={() => onDeleteHandler(_id, customIdAr)}
          />
        </td>
      </tr>
    )
  );

  const enBodyArr = cards?.map(
    ({ _id, image, customIdEn, titleEn, createdAt }, i) => (
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
          <img
            src={image}
            alt={titleEn}
            className={trim(`
              w-20
              h-20
              rounded-xl
              object-cover
              border
              border-primary
              m-auto
              md:w-32
              md:h-32
              md:rounded-2xl
              md:object-cover
              md:border-primary`)}
          />
        </td>
        <td
          className={trim(`
          p-2
          border-b
          border-r
          border-primary`)}
        >
          {customIdEn}
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
            space-y-2
            max-w-16`)}
        >
          <ButtonStyled
            ripple
            size="sm"
            href={`${appRoutes.editCard}/${_id}`}
            className={trim(`
              w-full
              rounded-xl
              hover:scale-105
              active:scale-95`)}
            warning
            title={t("cards.list.table.actions.edit")}
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
            title={t("cards.list.table.actions.delete")}
            onClick={() => onDeleteHandler(_id, customIdEn)}
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
