import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useFeed } from "./useFeed";

import Loader from "../../ui/Loader";
import FeedCollection from "./FeedCollection";
import FeedComment from "./FeedComment";
import FeedPost from "./FeedPost";
import FeedShared from "./FeedShared";

function Feed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeed();

  const { ref: inViewRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;

  return (
    <div className="m-auto flex w-3/4 justify-center">
      <ul className="flex w-1/2 flex-col items-center justify-between gap-8">
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.limitedDocuments?.map((feedElement) => {
              if (feedElement.documentType === "post")
                return <FeedPost key={feedElement._id} post={feedElement} />;

              if (feedElement.documentType === "collection")
                return (
                  <FeedCollection
                    key={feedElement._id}
                    collection={feedElement}
                  />
                );

              if (feedElement.documentType === "shared")
                return (
                  <FeedShared key={feedElement._id} shared={feedElement} />
                );

              if (feedElement.documentType === "comment")
                return (
                  <FeedComment key={feedElement._id} comment={feedElement} />
                );

              return <></>;
            })}
          </React.Fragment>
        ))}

        <div ref={inViewRef} className="mb-5 min-h-5">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && (
            <>
              <p>De momento no hay más publicaciones que mostrar.</p>
              <p>Volvé más tarde.</p>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Feed;
