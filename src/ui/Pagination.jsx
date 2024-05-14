import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import { useEffect } from "react";

function Pagination({ totalAmount }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(totalAmount / PAGE_SIZE);

  useEffect(() => {
    if (currentPage > pageCount) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, [currentPage, pageCount, searchParams, setSearchParams]);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  return (
    <div className="mx-10 mb-4 grid grid-cols-3 items-start">
      {currentPage > 1 && (
        <div className="col-start-1 flex items-center justify-start">
          <div
            className="flex items-center gap-1 hover:cursor-pointer"
            onClick={previousPage}
          >
            <BiLeftArrow />
            <p>Anterior</p>
          </div>
        </div>
      )}

      {pageCount > 1 && (
        <p className="col-start-2 place-self-center">
          Página {currentPage} de {pageCount}
        </p>
      )}

      {currentPage < pageCount && (
        <div className="col-start-3 flex items-center justify-end">
          <div
            className="flex items-center gap-1 hover:cursor-pointer"
            onClick={nextPage}
          >
            <p>Siguiente</p>
            <BiRightArrow />
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagination;
