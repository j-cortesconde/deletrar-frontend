import PostCard from "./PostCard";

function PostCardList({ posts }) {
  return (
    <ul className="grid grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </ul>
  );
}

export default PostCardList;
