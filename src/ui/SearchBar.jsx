import { useEffect, useRef, useState } from "react";
import { useSearchPosts } from "../features/posts/useSearchPosts";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const { isLoading, posts, error, refetch } = useSearchPosts(query);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

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
    <div className="relative" ref={searchContainerRef}>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={handleSearchTermChange}
        className="w-28 rounded-full bg-white px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />

      {posts?.length > 0 && (
        <ul className="absolute top-[110%] w-[100%] rounded-xl bg-slate-200 p-1 ">
          {posts.map((result) => (
            <li
              key={result._id}
              onClick={() => navigate("/post/banana")}
              className="border-stone-300 p-0.5"
            >
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
