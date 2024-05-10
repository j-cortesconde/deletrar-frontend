import UserCard from "../features/users/UserCard";
import PostCard from "../features/posts/PostCard";

function CardList({ posts, users, columns = 1 }) {
  return (
    <ul className={`grid grid-cols-${columns}`}>
      {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
      {users && users.map((user) => <UserCard key={user._id} user={user} />)}
    </ul>
  );
}

export default CardList;
