import { useParams } from "react-router-dom";

import { useFollowers } from "./useFollowers";

import CardList from "../../ui/CardList";
import Pagination from "../../ui/Pagination";
import TableOperations from "../../ui/TableOperations";
import Loader from "../../ui/Loader";

function UserFollowers() {
  const { username } = useParams();

  const { followers, count, isLoading } = useFollowers(username);
  // TODO: This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads
  if (isLoading) return <Loader />;

  return (
    <div>
      {count > 0 ? (
        <>
          <TableOperations totalAmount={count} />

          <CardList users={followers} />

          <Pagination totalAmount={count} />
        </>
      ) : (
        <p className="m-12 text-4xl first-letter:uppercase">
          {username} aún no tiene suscriptores
        </p>
      )}
    </div>
  );
}

export default UserFollowers;
