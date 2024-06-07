import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { useSavedPosts } from "../posts/useSavedPosts";
import { useSavedCollections } from "../collections/useSavedCollections";

import {
  COLLECTION_SORT_OPTIONS,
  POST_SORT_OPTIONS,
} from "../../utils/constants";
import Loader from "../../ui/Loader";
import CardList from "../../ui/CardList";
import TableOperations from "../../ui/TableOperations";
import Pagination from "../../ui/Pagination";
import Slider from "../../ui/Slider";

function UserSaved() {
  const { username } = useParams();
  const [, setSearchParams] = useSearchParams();
  const [toggleText, setToggleText] = useState(true);

  const { posts, count: postsCount, isLoading: isLoading1 } = useSavedPosts();
  const {
    collections,
    count: collectionsCount,
    isLoading: isLoading2,
  } = useSavedCollections();

  function handleToggle() {
    setToggleText((prev) => !prev);
    setSearchParams({});
  }

  // TODO: This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads
  if (isLoading1 || isLoading2) return <Loader />;

  return (
    <div>
      <div className="mb-2 flex justify-center">
        <div>
          <Slider
            toggleState={toggleText}
            onToggle={handleToggle}
            optionFalse={"Colecciones"}
            optionTrue={"Textos"}
          />
        </div>
      </div>

      {toggleText &&
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
            {username} aún no guardó ningún texto.
          </p>
        ))}

      {!toggleText &&
        (collectionsCount > 0 ? (
          <>
            <TableOperations
              totalAmount={collectionsCount}
              sortOptions={COLLECTION_SORT_OPTIONS}
            />

            <CardList collections={collections} />

            <Pagination totalAmount={collectionsCount} />
          </>
        ) : (
          <p className="m-12 text-4xl first-letter:uppercase">
            {username} aún no guardó ninguna colección.
          </p>
        ))}
    </div>
  );
}

export default UserSaved;
