import { useParams } from "react-router-dom";
import { useSearchPosts } from "../features/search/useSearchPosts";
import PostCard from "../features/posts/PostCard";

function PostSearchResults() {
  const { searchTerm } = useParams();
  const {
    isFetching: fetchingPosts,
    posts,
    error: postsError,
  } = useSearchPosts(searchTerm);

  return (
    <div className="flex justify-center">
      <ul className="w-7/12">
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default PostSearchResults;
