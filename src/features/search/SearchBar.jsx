import { useEffect, useRef, useState } from "react";
import { useSearchPosts } from "./useSearchPosts";
import SearchResultList from "./SearchResultList";
import { useClickOutsideDropdown } from "../../hooks/useClickOutsideDropdown";

function SearchBar() {
  const [query, setQuery] = useState("");
  const { isLoading, posts, error, refetch } = useSearchPosts(query);
  const searchContainerRef = useRef(null);

  function handleCloseResults() {
    setQuery("");
  }

  useClickOutsideDropdown(searchContainerRef, handleCloseResults);

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  const handleSearchTermChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative">
      <input
        ref={searchContainerRef}
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={handleSearchTermChange}
        className="w-48 rounded-full bg-white px-4 py-2 text-2xl transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-opacity-50 sm:w-80 sm:focus:w-96 md:w-[40rem] md:focus:w-[46rem]"
      />

      {posts?.length > 0 && (
        <SearchResultList posts={posts} onCloseResults={handleCloseResults} />
      )}
    </div>
  );
}

export default SearchBar;
