import { useEffect, useRef, useState } from "react";
import { useSearchPosts } from "./useSearchPosts";
import SearchResultList from "./SearchResultList";
import { useClickOutsideDropdown } from "../../hooks/useClickOutsideDropdown";
import { useSearchUsers } from "./useSearchUsers";
import { SEARCH_RESULTS } from "../../utils/constants";

function SearchBar() {
  const [query, setQuery] = useState("");
  const {
    isFetching: fetchingPosts,
    posts,
    error: postsError,
    refetch: refetchPosts,
  } = useSearchPosts(query);
  const {
    isFetching: fetchingUsers,
    users,
    error: usersError,
    refetch: refetchUsers,
  } = useSearchUsers(query);
  const searchContainerRef = useRef(null);

  const isFetching = fetchingPosts || fetchingUsers;

  const trimmedPosts = posts?.length > 0 ? posts.slice(0, SEARCH_RESULTS) : [];
  const trimmedUsers = users?.length > 0 ? users.slice(0, SEARCH_RESULTS) : [];
  const listResults = [...trimmedPosts, ...trimmedUsers];

  function handleCloseResults() {
    setQuery("");
  }

  useClickOutsideDropdown(searchContainerRef, handleCloseResults);

  useEffect(() => {
    refetchPosts();
    refetchUsers();
  }, [query, refetchPosts, refetchUsers]);

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

      {query !== "" && (
        <SearchResultList
          results={listResults}
          postsAmount={posts?.length}
          usersAmount={users?.length}
          onCloseResults={handleCloseResults}
          isFetching={isFetching}
        />
      )}
    </div>
  );
}

export default SearchBar;
