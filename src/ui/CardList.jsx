import UserCard from "../features/users/UserCard";
import PostCard from "../features/posts/PostCard";
import CollectionCard from "../features/collections/CollectionCard";

function CardList({ posts, users, collections }) {
  return (
    <ul className={`grid grid-cols-2`}>
      {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}

      {collections &&
        collections.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}

      {users &&
        users.map((user) => <UserCard key={user.username} user={user} />)}
    </ul>
  );
}

export default CardList;
