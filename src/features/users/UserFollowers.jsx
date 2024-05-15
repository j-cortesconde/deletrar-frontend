import { useParams } from "react-router-dom";

import { useFollowers } from "./useFollowers";

import CardList from "../../ui/CardList";
import Pagination from "../../ui/Pagination";
import TableOperations from "../../ui/TableOperations";
import Loader from "../../ui/Loader";

function UserFollowers() {
  const { username } = useParams();

  // TODO: Instead of getting them by user.following it should have a specific useFollowing hook that queries a route in the backend that somehow returns an array of user documents including ony id, name, username and photo (no summary, thus would need a different card instead of UserCard [smth like FollowingCard which should also be added to CardList]). [Maybe should even have a different approach altogether, not cards.]
  // This should include pagination and sorting.
  const { followers, count, isLoading } = useFollowers(username);
  console.log(followers);
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
          {username} aún no tiene seguidores
        </p>
      )}
    </div>
  );
}

export default UserFollowers;
