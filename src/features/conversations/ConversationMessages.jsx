import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import ConversationMessage from "./ConversationMessage";
import Loader from "../../ui/Loader";

function ConversationMessages({
  addressee,
  self,
  pages,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}) {
  const containerRef = useRef(null);
  const { ref: inViewRef, inView } = useInView();
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  // Handle scrolling to the bottom of the container on mount
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  }, []);

  // Handle Refetching and getting scroll height on inView
  useEffect(() => {
    if (inView && hasNextPage) {
      // Store the previous scroll height}
      const container = containerRef.current;
      setPrevScrollHeight(container.scrollHeight);

      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Handle setting new scroll height after Refetch
  useEffect(() => {
    const container = containerRef.current;
    // Calculate the height difference between now and Refetch
    const heightDiff = container.scrollHeight - prevScrollHeight;

    // Adjust the scroll position to maintain the previous view
    container.scrollTop += heightDiff;
  }, [pages, prevScrollHeight]);

  return (
    <div ref={containerRef} className="h-full flex-1 overflow-y-auto p-4">
      <div ref={inViewRef} className="h-5">
        {/* //TODO: Should be localized spinner */}
        {isFetchingNextPage && <Loader />}
      </div>
      {pages?.map((page) => (
        <React.Fragment key={page.nextPage}>
          {page.messages?.map((message, i) => (
            <ConversationMessage
              key={message._id}
              message={message}
              addressee={addressee}
              self={self}
              previousMessageTime={page.messages[i - 1]?.timestamp}
              previousMessageMessenger={page.messages[i - 1]?.messenger}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ConversationMessages;
