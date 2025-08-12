import { ITablePaginatorProps } from "../../utils/types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FirstPageIcon,
  LastPageIcon,
} from "../svg/SvgIcons";

export default function TablePaginator({
  currentPage,
  totalItems,
  totalPages,
  handleChangePage,
}: ITablePaginatorProps) {
  function firstPage() {
    return 1;
  }

  function lastPage() {
    return totalPages;
  }

  function nextPage() {
    return currentPage < totalPages ? currentPage + 1 : currentPage;
  }

  function backPage() {
    return currentPage > 1 ? currentPage - 1 : currentPage;
  }

  return (
    <div
      className="w-full rounded-2xl shadow-lg h-20 p-6 mt-4 flex justify-center items-center bg-white 
        md:pt-2 md:justify-end md:rounded-none md:shadow-none md:mt-0 md:p-0 md:h-10"
    >
      <p className="flex mr-2 md:mr-4 md:text-sm">
        {totalItems > 0
          ? `${(currentPage - 1) * 1 + 1} - ${currentPage} de ${totalItems}`
          : `0 de 0`}
      </p>

      <div className="flex items-center border rounded-full border-secondary">
        <button
          onClick={() => handleChangePage(firstPage())}
          type="button"
          className="h-10 px-4 md:h-7 md:py-0.5 md:px-3"
        >
          <FirstPageIcon />
        </button>
        <button
          onClick={() => handleChangePage(backPage())}
          type="button"
          className="h-10 px-4 md:h-7 md:py-0.5 md:px-3 border-x border-secondary"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={() => handleChangePage(nextPage())}
          type="button"
          className="h-10 px-4 md:h-7 md:py-0.5 md:px-3 border-r border-secondary"
        >
          <ChevronRightIcon />
        </button>
        <button
          onClick={() => handleChangePage(lastPage())}
          type="button"
          className="h-10 px-4 md:h-7 md:py-0.5 md:px-3"
        >
          <LastPageIcon />
        </button>
      </div>
    </div>
  );
}
