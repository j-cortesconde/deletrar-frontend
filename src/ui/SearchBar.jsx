import { useEffect, useState } from "react";
import { useSearchPosts } from "../features/posts/useSearchPosts";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const { isLoading, posts, error, refetch } = useSearchPosts(query);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  const handleSearchTermChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={handleSearchTermChange}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
      {posts?.length > 0 && (
        <div className="search-results">
          {posts.map((result) => (
            <button
              key={result._id}
              className="search-result"
              onClick={() => navigate("/post/banana")}
            >
              {result.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
