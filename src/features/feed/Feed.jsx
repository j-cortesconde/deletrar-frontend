import Loader from "../../ui/Loader";
import FeedCollection from "./FeedCollection";
import FeedPost from "./FeedPost";
import { useFeed } from "./useFeed";

function Feed() {
  const { feed, isLoading } = useFeed();

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center">
      <ul className="flex w-3/4 flex-col items-center justify-between gap-8">
        {feed?.map((feedElement) => {
          if (feedElement.documentType === "post")
            return <FeedPost key={feedElement._id} post={feedElement} />;
          if (feedElement.documentType === "collection")
            return (
              <FeedCollection key={feedElement._id} collection={feedElement} />
            );
          return (
            <p
              key={feedElement._id}
            >{`Acá va un ${feedElement.documentType}`}</p>
          );
        })}
      </ul>
    </div>
  );
}

export default Feed;
