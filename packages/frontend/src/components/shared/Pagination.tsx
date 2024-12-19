import { Dispatch, SetStateAction } from "react";
import { PaginateMeta } from "../../types/response";
import ButtonStyled from "./ButtonStyled";
import { useTranslation } from "react-i18next";
import usePagination, { DOTS } from "../../hooks/usePagination";

const Pagination = ({
  meta,
  setQuery,
}: {
  setQuery: Dispatch<
    SetStateAction<{
      page: number;
      limit: number;
    }>
  >;
  meta: PaginateMeta;
}) => {
  const { t } = useTranslation(["common"]);

  const paginationRange = usePagination({
    totalCount: meta.itemCount,
    pageSize: meta.limit,
    siblingCount: 1,
    currentPage: meta.page,
  });

  if (!meta.page || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const onPrevious = () => {
    setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const onChangePage = (page: number) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  return (
    <ul className="flex justify-center items-center gap-4 mt-4">
      <li>
        <ButtonStyled
          size="custom"
          title={t("previous")}
          onClick={() => onPrevious()}
          className={`${!meta?.hasPreviousPage ? "!text-gray-500" : ""}`}
          disabled={!meta?.hasPreviousPage}
        />
      </li>

      <li>
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return <span key={i}>&#8230;</span>;
          }

          return (
            <ButtonStyled
              size="custom"
              key={i}
              title={`${pageNumber}`}
              className={`
                ${meta.page === pageNumber ? "bg-primary text-white" : ""}
                rounded-full
                py-2
                px-4
                text-sm`}
              onClick={() =>
                meta.page !== pageNumber && onChangePage(+pageNumber)
              }
            />
          );
        })}
      </li>

      <li>
        <ButtonStyled
          size="custom"
          title={t("next")}
          onClick={() => onNext()}
          className={`${!meta?.hasNextPage ? "!text-gray-500" : ""}`}
          disabled={!meta?.hasNextPage}
        />
      </li>
    </ul>
  );
};

export default Pagination;
