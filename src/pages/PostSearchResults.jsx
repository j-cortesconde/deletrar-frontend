import { useParams } from "react-router-dom";

import { useSearchPosts } from "../features/search/useSearchPosts";
import { useErrorHandler } from "../hooks/useErrorHandler";

import CardList from "../ui/CardList";

function PostSearchResults() {
  const { searchTerm } = useParams();
  const {
    isFetching: fetchingPosts,
    posts,
    error,
  } = useSearchPosts(searchTerm);
  useErrorHandler(error);

  return (
    <div className="mx-auto flex w-3/4 justify-center">
      <CardList posts={posts} />
    </div>
  );
}

export default PostSearchResults;
