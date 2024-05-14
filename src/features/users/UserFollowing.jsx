import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import CardList from "../../ui/CardList";
import Pagination from "../../ui/Pagination";
import TableOperations from "../../ui/TableOperations";
import { POST_SORT_OPTIONS } from "../../utils/constants";

function UserFollowing() {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user", username]);

  // TODO: Instead of getting them by user.following it should have a specific useFollowing hook that queries a route in the backend that somehow returns an array of user documents including ony id, name, username and photo (no summary, thus would need a different card instead of UserCard [smth like FollowingCard which should also be added to CardList]). [Maybe should even have a different approach altogether, not cards.]
  // This should include pagination and sorting.
  const [sortedUsers, setSortedUsers] = useState(user.following?.slice());

  // order = 1 for ascending, -1 for descending
  const handleSort = useCallback(
    (field, order = 1) => {
      setSortedUsers(
        user.following?.slice().sort((a, b) => {
          const valueA = a[field] || 0;
          const valueB = b[field] || 0;

          if (field === "title") return valueA.localeCompare(valueB) * order;
          else return (new Date(valueA) - new Date(valueB)) * order;
        }),
      );
    },
    [user.following],
  );

  useEffect(() => {
    handleSort("postedAt", -1);
  }, [handleSort]);

  // TODO: This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads

  return (
    <div>
      {sortedUsers?.length > 0 ? (
        <>
          <TableOperations
            totalAmount={sortedUsers.length}
            sortOptions={POST_SORT_OPTIONS}
          />

          <CardList users={sortedUsers} />

          <Pagination totalAmount={sortedUsers.length} />
        </>
      ) : (
        <p className="m-12 text-4xl">{user.name} aún no tiene seguidores</p>
      )}
    </div>
  );
}

export default UserFollowing;
