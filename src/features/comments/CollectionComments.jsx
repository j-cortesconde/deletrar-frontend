import { useState } from "react";
import { useComments } from "./useComments";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

import { COMMENT_PAGE_AMOUNT } from "../../utils/constants";
import Loader from "../../ui/Loader";
import CommentCard from "./CommentCard";
import ReactPaginate from "react-paginate";

function CollectionComments({ collectionId }) {
  const [page, setPage] = useState(1);

  const { comments, isLoading, count } = useComments({
    type: "collection",
    id: collectionId,
    page,
  });

  const pageCount = Math.ceil(count / COMMENT_PAGE_AMOUNT);

  //TODO: Should actually be a localized spinner
  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto w-3/4">
      <ul>
        {comments?.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </ul>

      {pageCount > 1 && (
        <ReactPaginate
          forcePage={page - 1}
          onPageChange={(e) => setPage(e.selected + 1)}
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          previousLabel={page === 1 ? null : <BiLeftArrow />}
          nextLabel={page === pageCount ? null : <BiRightArrow />}
          breakLabel="..."
          renderOnZeroPageCount={null}
          className="flex justify-center gap-4"
          activeClassName="font-bold"
          previousClassName="flex items-center"
          nextClassName="flex items-center"
          disabledLinkClassName="hover:cursor-not-allowed"
        />
      )}
    </div>
  );
}

export default CollectionComments;
