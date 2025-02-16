import { Dispatch, SetStateAction } from "react";
import { PaginateMeta } from "../../types/response";
import ButtonStyled from "./ButtonStyled";
import usePagination, { DOTS } from "../../hooks/usePagination";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

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
    <ul className="flex justify-center items-center gap-6 mt-4">
      <li>
        <ButtonStyled
          size="custom"
          SvgIcon={<FaChevronLeft />}
          onClick={() => onPrevious()}
          className={`${!meta?.hasPreviousPage ? "!text-gray-500" : ""}`}
          disabled={!meta?.hasPreviousPage}
        />
      </li>

      <li className="flex items-center gap-4">
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
                ${meta.page === pageNumber ? "bg-[#D9D9D9] text-primary" : "!text-gray-500"}
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
          SvgIcon={<FaChevronRight />}
          onClick={() => onNext()}
          className={`${!meta?.hasNextPage ? "!text-gray-500" : ""}`}
          disabled={!meta?.hasNextPage}
        />
      </li>
    </ul>
  );
};

export default Pagination;
