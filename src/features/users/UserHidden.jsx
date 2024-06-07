import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useHiddenPosts } from "../posts/useHiddenPosts";
import { useHiddenCollections } from "../collections/useHiddenCollections";
import { useIsOwnUser } from "./useIsOwnUser";

import {
  HIDDEN_COLLECTION_SORT_OPTIONS,
  HIDDEN_POST_SORT_OPTIONS,
} from "../../utils/constants";
import Loader from "../../ui/Loader";
import CardList from "../../ui/CardList";
import TableOperations from "../../ui/TableOperations";
import Pagination from "../../ui/Pagination";
import Slider from "../../ui/Slider";

function UserHidden() {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [toggleText, setToggleText] = useState(true);
  const { isOwnUser, username } = useIsOwnUser();

  useEffect(() => {
    if (isOwnUser) return;
    navigate(`/user/${username}`);
  }, [isOwnUser, username, navigate]);

  const { posts, count: postsCount, isLoading: isLoading1 } = useHiddenPosts();
  const {
    collections,
    count: collectionsCount,
    isLoading: isLoading2,
  } = useHiddenCollections();

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
              sortOptions={HIDDEN_POST_SORT_OPTIONS}
            />

            <CardList posts={posts} shouldBePosted={false} />

            <Pagination totalAmount={postsCount} />
          </>
        ) : (
          <p className="m-12 text-4xl first-letter:uppercase">
            No hay ningún texto inédito
          </p>
        ))}

      {!toggleText &&
        (collectionsCount > 0 ? (
          <>
            <TableOperations
              totalAmount={collectionsCount}
              sortOptions={HIDDEN_COLLECTION_SORT_OPTIONS}
            />

            <CardList collections={collections} shouldBePosted={false} />

            <Pagination totalAmount={collectionsCount} />
          </>
        ) : (
          <p className="m-12 text-4xl first-letter:uppercase">
            No hay ninguna colección inédita
          </p>
        ))}
    </div>
  );
}

export default UserHidden;
