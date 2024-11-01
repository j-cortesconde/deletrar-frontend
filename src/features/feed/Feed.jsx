import Loader from "../../ui/Loader";
import CollectionCard from "../collections/CollectionCard";
import PostCard from "../posts/PostCard";
import { useFeed } from "./useFeed";

function Feed() {
  const { feed, isLoading } = useFeed();

  if (isLoading) return <Loader />;

  return (
    <ul>
      {feed?.map((feedElement) => {
        if (feedElement.documentType === "post")
          return <PostCard key={feedElement._id} post={feedElement} />;
        if (feedElement.documentType === "collection")
          return (
            <CollectionCard key={feedElement._id} collection={feedElement} />
          );
        return (
          <p key={feedElement._id}>{`Acá va un ${feedElement.documentType}`}</p>
        );
      })}
    </ul>
  );
}

export default Feed;
