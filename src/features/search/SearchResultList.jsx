import { useRef } from "react";
import SearchResult from "./SearchResult";
import { useScrollList } from "../../hooks/useScrollList";

function SearchResultList({ posts, onCloseResults }) {
  const listRef = useRef(null);
  const selectedIndex = useScrollList(listRef, onCloseResults);

  return (
    <ul
      ref={listRef}
      className="absolute top-[110%] z-50 w-[100%] gap-1 rounded-xl bg-slate-200  p-1"
    >
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
