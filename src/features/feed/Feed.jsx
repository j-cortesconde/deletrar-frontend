import Loader from "../../ui/Loader";
import FeedCollection from "./FeedCollection";
import FeedComment from "./FeedComment";
import FeedPost from "./FeedPost";
import FeedShared from "./FeedShared";
import { useFeed } from "./useFeed";

function Feed() {
  const { feed, isLoading } = useFeed();

  if (isLoading) return <Loader />;

  return (
    <div className="m-auto flex w-3/4 justify-center">
      <ul className="flex w-1/2 flex-col items-center justify-between gap-8">
        {feed?.map((feedElement) => {
          if (feedElement.documentType === "post")
            return <FeedPost key={feedElement._id} post={feedElement} />;

          if (feedElement.documentType === "collection")
            return (
              <FeedCollection key={feedElement._id} collection={feedElement} />
            );

          if (feedElement.documentType === "shared")
            return <FeedShared key={feedElement._id} shared={feedElement} />;

          if (feedElement.documentType === "comment")
            return <FeedComment key={feedElement._id} comment={feedElement} />;
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
