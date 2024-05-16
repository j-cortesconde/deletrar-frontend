import { useParams } from "react-router-dom";

import { useFollowing } from "./useFollowing";

import CardList from "../../ui/CardList";
import Pagination from "../../ui/Pagination";
import TableOperations from "../../ui/TableOperations";
import Loader from "../../ui/Loader";

function UserFollowing() {
  const { username } = useParams();

  const { following, count, isLoading } = useFollowing(username);

  // TODO: This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads
  if (isLoading) return <Loader />;

  return (
    <div>
      {count > 0 ? (
        <>
          <TableOperations totalAmount={count} />

          <CardList users={following} />

          <Pagination totalAmount={count} />
        </>
      ) : (
        <p className="m-12 text-4xl first-letter:uppercase">
          {username} aún no está suscripto a nadie.
        </p>
      )}
    </div>
  );
}

export default UserFollowing;
