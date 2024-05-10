import { useParams } from "react-router-dom";
import { useSearchPosts } from "../features/search/useSearchPosts";

import PostCardList from "../features/posts/PostCardList";

function PostSearchResults() {
  const { searchTerm } = useParams();
  const {
    isFetching: fetchingPosts,
    posts,
    error: postsError,
  } = useSearchPosts(searchTerm);

  return (
    <div className="flex justify-center">
      <PostCardList posts={posts} />
    </div>
  );
}

export default PostSearchResults;
