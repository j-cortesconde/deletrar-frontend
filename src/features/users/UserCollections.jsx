// FIXME: Aun no resolvi como voy a hacer para traer solo las colecciones autorizadas (ni cómo distinguir la info que traigo de otros de la mia)
import { useParams } from "react-router-dom";

import { useCollections } from "../collections/useCollections";

import Loader from "../../ui/Loader";
import CardList from "../../ui/CardList";
import TableOperations from "../../ui/TableOperations";
import Pagination from "../../ui/Pagination";
import { POST_SORT_OPTIONS } from "../../utils/constants";

function UserPosts() {
  const { username } = useParams();

  const { collections, count, isLoading } = useCollections(username);

  // TODO: This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads
  if (isLoading) return <Loader />;

  return (
    <div>
      {count > 0 ? (
        <>
          <TableOperations
            totalAmount={count}
            // TODO: Should pass in a COLLECTION_SORT_OPTIONS
            sortOptions={POST_SORT_OPTIONS}
          />

          <CardList
            // TODO: Should add collections to CardList
            collections={collections}
          />

          <Pagination totalAmount={count} />
        </>
      ) : (
        <p className="m-12 text-4xl first-letter:uppercase">
          {username} aún no creó ninguna colección
        </p>
      )}
    </div>
  );
}

export default UserPosts;
