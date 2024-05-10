import { useParams } from "react-router-dom";
import { useSearchPosts } from "../features/search/useSearchPosts";

import CardList from "../ui/CardList";

function PostSearchResults() {
  const { searchTerm } = useParams();
  const {
    isFetching: fetchingPosts,
    posts,
    error: postsError,
  } = useSearchPosts(searchTerm);

  return (
    <div className="mx-auto flex w-3/4 justify-center">
      <CardList posts={posts} columns={2} />
    </div>
  );
}

export default PostSearchResults;
