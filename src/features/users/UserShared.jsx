import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { useShareds } from "../shareds/useShareds";

import Loader from "../../ui/Loader";
import FeedShared from "../feed/FeedShared";

function UserShared() {
  const { username } = useParams();

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useShareds(username);

  const { ref: inViewRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // TODO: This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads
  if (isLoading) return <Loader />;

  return (
    <div className="m-auto mt-10 flex w-3/4 flex-col gap-4">
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.limitedDocuments?.map((shared) => (
            <FeedShared key={shared._id} shared={shared} />
          ))}
        </React.Fragment>
      ))}

      <div ref={inViewRef} className="h-5">
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
}

export default UserShared;
