import { useEffect, useRef, useState } from "react";
import { useSearchPosts } from "./useSearchPosts";
import SearchResultList from "./SearchResultList";

function SearchBar() {
  const [query, setQuery] = useState("");
  const { isLoading, posts, error, refetch } = useSearchPosts(query);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        // Click occurred outside of the search container, close the search results
        setQuery("");
      }
    };

    // Attach event listener to detect clicks outside of the search container
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
        <SearchResultList posts={posts} setQuery={setQuery} />
      )}
    </div>
  );
}

export default SearchBar;
