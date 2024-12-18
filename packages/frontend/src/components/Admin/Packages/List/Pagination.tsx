import { Dispatch, SetStateAction } from "react";
import { PaginateMeta } from "../../../../types/response";
import ButtonStyled from "../../../shared/ButtonStyled";
import { useTranslation } from "react-i18next";

const Pagination = ({
  meta,
  qurery,
  setQuery,
}: {
  qurery: {
    page: number;
    limit: number;
  };
  setQuery: Dispatch<
    SetStateAction<{
      page: number;
      limit: number;
    }>
  >;
  meta?: PaginateMeta;
}) => {
  const { t } = useTranslation(["common"]);

  return (
    <ul className="flex justify-center items-center gap-4 mt-4">
      <li>
        <ButtonStyled
          size="custom"
          title={t("previous")}
          onClick={() => setQuery((prev) => ({ ...prev, page: prev.page - 1 }))}
          className={`${!meta?.hasPreviousPage ? "text-gray-500" : ""}`}
          disabled={!meta?.hasPreviousPage}
        />
      </li>

      <li>
        {Array.from({ length: qurery.page }, (_, i) => (
          <ButtonStyled
            size="custom"
            title={`${i + 1}`}
            key={i}
            className={`
              px-4 
              py-2
              rounded-md
              ${qurery.page === i + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
            onClick={() =>
              setQuery((prev) => ({
                ...prev,
                page: prev.page === i + 1 ? prev.page : i + 1,
              }))
            }
          />
        ))}
      </li>

      <li>
        <ButtonStyled
          size="custom"
          title={t("next")}
          onClick={() => setQuery((prev) => ({ ...prev, page: prev.page + 1 }))}
          className={`${!meta?.hasNextPage ? "text-gray-500" : ""}`}
          disabled={!meta?.hasNextPage}
        />
      </li>
    </ul>
  );
};

export default Pagination;
