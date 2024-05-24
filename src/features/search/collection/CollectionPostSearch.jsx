import { useState } from "react";

import { useDebounce } from "../../../hooks/useDebounce";
import { useSearchPosts } from "../useSearchPosts";
import { useClickOutside } from "../../../hooks/useClickOutside";

import CollectionPostResults from "./CollectionPostResults";

function CollectionPostSearch({ handleSelect }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  const { isFetching, posts, error } = useSearchPosts(debouncedQuery);

  function handleCloseResults() {
    setQuery("");
  }

  const { elementRef } = useClickOutside(handleCloseResults);

  const handleSearchTermChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative">
      <input
        ref={elementRef}
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleSearchTermChange}
        className="w-48 rounded-full bg-white px-4 py-2 text-2xl transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-opacity-50 sm:w-80 sm:focus:w-96 md:w-[40rem] md:focus:w-[46rem]"
      />

      {debouncedQuery !== "" && (
        <CollectionPostResults
          onSelect={handleSelect}
          isFetching={isFetching}
          posts={posts}
          onCloseResults={handleCloseResults}
        />
      )}
    </div>
  );
}

export default CollectionPostSearch;
