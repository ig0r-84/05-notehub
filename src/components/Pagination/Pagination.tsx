import ReactPaginateModule from "react-paginate";
import css from "./Pagination.module.css";

const ReactPaginate =
  (
    ReactPaginateModule as unknown as {
      default?: typeof ReactPaginateModule;
    }
  ).default ?? ReactPaginateModule;

interface PaginationProps {
  totalPages: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  console.log("totalPages:", totalPages);
  console.log("perPage:", perPage);
  const pageCount = totalPages;
  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(event) => {
        onPageChange(event.selected + 1);
      }}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.page}
      nextClassName={css.page}
      disabledClassName={css.disabled}
      renderOnZeroPageCount={null}
    />
  );
}
