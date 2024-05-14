import UserCard from "../features/users/UserCard";
import PostCard from "../features/posts/PostCard";

function CardList({ posts, users }) {
  return (
    <ul className={`grid grid-cols-2`}>
      {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
      {users &&
        users.map((user) => <UserCard key={user.username} user={user} />)}
    </ul>
  );
}

export default CardList;
