import UserCard from "../features/users/UserCard";
import PostCard from "../features/posts/PostCard";
import CollectionCard from "../features/collections/CollectionCard";
import MasonryLayout from "./MasonryLayout";

function CardList({ posts, users, collections, shouldBePosted = true }) {
  // const reorderedPosts =

  return (
    <ul className="">
      <MasonryLayout>
        {posts &&
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              shouldBePosted={shouldBePosted}
            />
          ))}
        {collections &&
          collections.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
        {users &&
          users.map((user) => <UserCard key={user.username} user={user} />)}
      </MasonryLayout>
    </ul>
  );
}

export default CardList;
