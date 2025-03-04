// TODO: All search functionality must be revamped (add pagination and sort in backend and in ...SearchResult pages)
import slugify from "slugify";
import { useState } from "react";

import { useSearchPosts } from "../useSearchPosts";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useSearchUsers } from "../useSearchUsers";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSearchCollections } from "../useSearchCollections";

import GeneralResultList from "./GeneralResultList";

function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  const {
    isFetching: fetchingPosts,
    posts,
    error: postsError,
  } = useSearchPosts(debouncedQuery);
  const {
    isFetching: fetchingUsers,
    users,
    error: usersError,
  } = useSearchUsers(debouncedQuery);
  const {
    isFetching: fetchingCollections,
    collections,
    error: collectionsError,
  } = useSearchCollections(debouncedQuery);

  const isFetching = fetchingPosts || fetchingUsers || fetchingCollections;

  const querySlug = slugify(debouncedQuery, {
    lower: true,
    remove: /[*+~.,:;()'"¡!¿?@]/g,
  });

  function handleCloseResults() {
    setQuery("");
  }

  const { elementRef } = useClickOutside(handleCloseResults);

  const handleSearchTermChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative col-span-2 flex justify-center">
      <input
        ref={elementRef}
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleSearchTermChange}
        className="w-48 rounded-full bg-white px-4 py-2 text-2xl transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-opacity-50 sm:w-80 sm:focus:w-96 md:w-[40rem] md:focus:w-[46rem]"
      />

      {debouncedQuery !== "" && (
        <GeneralResultList
          posts={posts}
          users={users}
          collections={collections}
          onCloseResults={handleCloseResults}
          isFetching={isFetching}
          query={querySlug}
        />
      )}
    </div>
  );
}

export default SearchBar;
