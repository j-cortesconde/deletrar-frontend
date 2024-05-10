import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import SortBy from "../../ui/SortBy";
import CardList from "../../ui/CardList";

function UserFollowing() {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user", username]);
  const [sortedUsers, setSortedUsers] = useState(user.following?.slice());

  console.log(user.following);

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

  const sortOptions = [
    {
      value: "postedDate-desc",
      label: "Fecha de publicación (nuevo)",
      action: () => handleSort("postedAt", -1),
    },
    {
      value: "postedDate-asc",
      label: "Fecha de publicación (viejo)",
      action: () => handleSort("postedAt", 1),
    },
    {
      value: "updateDate-desc",
      label: "Fecha de actualización (nuevo)",
      action: () => handleSort("updatedAt", -1),
    },
    {
      value: "updateDate-asc",
      label: "Fecha de actualización (viejo)",
      action: () => handleSort("updatedAt", 1),
    },
    {
      value: "title-asc",
      label: "Título (A-Z)",
      action: () => handleSort("title", 1),
    },
    {
      value: "title-desc",
      label: "Título (Z-A)",
      action: () => handleSort("title", -1),
    },
  ];

  return (
    <div>
      {sortedUsers?.length > 0 ? (
        <>
          <div className="flex justify-between px-5 ">
            <p>{sortedUsers.length} textos publicados</p>
            <SortBy options={sortOptions} />
          </div>

          <CardList users={sortedUsers} columns={2} />
        </>
      ) : (
        <p className="m-12 text-4xl">{user.name} aún no publicó ningún texto</p>
      )}
    </div>
  );
}

export default UserFollowing;
