import slugify from "slugify";
import { useRef, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";
import { useSearchPosts } from "../search/useSearchPosts";
import { useClickOutsideDropdown } from "../../hooks/useClickOutsideDropdown";

function CollectionPostSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  const { isFetching, posts, error } = useSearchPosts(debouncedQuery);
  const searchContainerRef = useRef(null);

  const querySlug = slugify(debouncedQuery, {
    lower: true,
    remove: /[*+~.,:;()'"¡!¿?@]/g,
  });

  function handleCloseResults() {
    setQuery("");
  }

  useClickOutsideDropdown(searchContainerRef, handleCloseResults);

  const handleSearchTermChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative">
      <input
        ref={searchContainerRef}
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleSearchTermChange}
        className="w-48 rounded-full bg-white px-4 py-2 text-2xl transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-opacity-50 sm:w-80 sm:focus:w-96 md:w-[40rem] md:focus:w-[46rem]"
      />

      {debouncedQuery !== "" && posts?.length === 0 ? (
        // When nothing's found
        <div className="absolute top-[110%] z-50 w-[100%]  rounded-xl bg-slate-200">
          <p className="p-4 text-center text-3xl">
            Tu búsqueda no devolvió resultados.
          </p>
        </div>
      ) : (
        // When something's found
        <p>Something</p>
      )}
    </div>
  );
}

export default CollectionPostSearch;
