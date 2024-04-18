import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

function SearchResultList({ posts, setQuery }) {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track selected index
  const navigate = useNavigate();

  // Add event listener for keyboard navigation
  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setSelectedIndex((prevIndex) => {
            if (prevIndex - 1 < 0) return posts.length - 1;
            else return prevIndex - 1;
          });
          break;
        case "ArrowDown":
          setSelectedIndex((prevIndex) => {
            if (prevIndex + 1 > posts.length - 1) return 0;
            else return prevIndex + 1;
          });
          break;
        case "Enter":
          if (posts[selectedIndex]) {
            navigate(`/post/${posts[selectedIndex]._id}`);
            setQuery("");
          }
          break;
        case "Escape":
          setQuery("");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, posts, selectedIndex, setQuery]);

  return (
    <ul className="absolute top-[110%] z-50 w-[100%] gap-1 rounded-xl bg-slate-200  p-1">
      {posts.map((result, index) => (
        <SearchResult
          key={result._id}
          selected={index === selectedIndex}
          to={`/post/${result._id}`}
          result={result}
        />
      ))}
    </ul>
  );
}

export default SearchResultList;
