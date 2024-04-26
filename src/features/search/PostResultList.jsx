import { useNavigate } from "react-router-dom";
import { SEARCH_RESULTS } from "../../utils/constants";
import PostResult from "./PostResult";
import SearchLi from "../../ui/SearchLi";

function PostResultList({ posts, query, selectedIndex }) {
  const navigate = useNavigate();

  const postsAmount = posts?.length;
  const trimmedPosts = postsAmount > 0 ? posts.slice(0, SEARCH_RESULTS) : [];
  const trimmedPostsAmount =
    postsAmount > SEARCH_RESULTS ? SEARCH_RESULTS : postsAmount;

  return (
    <li>
      <p
        key={`posts-title-${query}`}
        className="rounded-t-xl border-b-2 border-slate-300 bg-slate-300 px-2 py-2 font-semibold"
      >
        Posts
      </p>
      <ul>
        {trimmedPosts.map((result, index) => (
          <PostResult
            key={result._id}
            selected={index === selectedIndex}
            to={`/post/${result._id}`}
            result={result}
          />
        ))}
        {trimmedPostsAmount < postsAmount && (
          <SearchLi
            key={`posts-link-${query}`}
            selected={SEARCH_RESULTS === selectedIndex}
            onClick={() => navigate(`/posts/${query}`)}
          >
            See more...
          </SearchLi>
        )}
      </ul>
    </li>
  );
}

export default PostResultList;
