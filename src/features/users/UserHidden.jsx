// TODO: Solve the issue of sorting hidden posts and hidden collections (in Custom Hooks too) and Collections in UserCollections
// TODO: Implement redirecting so if anyone not user gets here gets sent out
// TODO: Add collections to search (in backend and frontend )
import { useParams, useSearchParams } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import { useHiddenPosts } from "../posts/useHiddenPosts";

import Loader from "../../ui/Loader";
import CardList from "../../ui/CardList";
import TableOperations from "../../ui/TableOperations";
import Pagination from "../../ui/Pagination";
import { POST_SORT_OPTIONS } from "../../utils/constants";
import { useHiddenCollections } from "../collections/useHiddenCollections";
import { useState } from "react";
import Button from "../../ui/Button";
import Slider from "../../ui/Slider";

function UserHidden() {
  const { username } = useParams();
  const [, setSearchParams] = useSearchParams();
  // const queryClient = useQueryClient();
  // const ownUser = queryClient.getQueryData(["user"]);
  const [toggleCollection, setToggleCollection] = useState(false);

  const { posts, count: postsCount, isLoading: isLoading1 } = useHiddenPosts();
  const {
    collections,
    count: collectionsCount,
    isLoading: isLoading2,
  } = useHiddenCollections();

  function handleToggle() {
    setToggleCollection((prev) => !prev);
    setSearchParams({});
  }

  // TODO: This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads
  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <div>
      <Slider />
      {/* <div className="mx-5 mb-2 flex items-end justify-start gap-5">
        <p className="text-5xl">
          {toggleCollection ? "Colecciones" : "Textos"}
        </p>
        <p onClick={handleToggle}>
          (ver {toggleCollection ? "textos" : "colecciones"})
        </p>
      </div> */}
      {!toggleCollection &&
        (postsCount > 0 ? (
          <>
            <TableOperations
              totalAmount={postsCount}
              sortOptions={POST_SORT_OPTIONS}
            />

            <CardList posts={posts} />

            <Pagination totalAmount={postsCount} />
          </>
        ) : (
          <p className="m-12 text-4xl first-letter:uppercase">
            {username} aún no publicó ningún texto
          </p>
        ))}

      {toggleCollection &&
        (collectionsCount > 0 ? (
          <>
            <TableOperations
              totalAmount={collectionsCount}
              sortOptions={POST_SORT_OPTIONS}
            />

            <CardList collections={collections} />

            <Pagination totalAmount={collectionsCount} />
          </>
        ) : (
          <p className="m-12 text-4xl first-letter:uppercase">
            {username} aún no publicó ningún texto
          </p>
        ))}
    </div>
  );
}

export default UserHidden;
