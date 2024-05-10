// FIXME: Aun no resolvi como voy a hacer para traer solo los textos autorizados (ni como distinguir la info que traigo de otros de la mia)
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import SortBy from "../../ui/SortBy";
import CardList from "../../ui/CardList";
import { usePosts } from "../posts/usePosts";
import Loader from "../../ui/Loader";

function UserPosts() {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user", username]);
  const { posts, isLoading } = usePosts(username);

  const [sortedPosts, setSortedPosts] = useState(posts?.slice());

  // order = 1 for ascending, -1 for descending
  const handleSort = useCallback(
    (field, order = 1) => {
      setSortedPosts(
        posts?.slice().sort((a, b) => {
          const valueA = a[field] || 0;
          const valueB = b[field] || 0;

          if (field === "title") return valueA.localeCompare(valueB) * order;
          else return (new Date(valueA) - new Date(valueB)) * order;
        }),
      );
    },
    [posts],
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

  // This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads
  if (isLoading) return <Loader />;

  return (
    <div>
      {sortedPosts?.length > 0 ? (
        <>
          <div className="flex justify-between px-5 ">
            <p>{sortedPosts.length} textos publicados</p>
            <SortBy options={sortOptions} />
          </div>

          <CardList posts={sortedPosts} columns={2} />
        </>
      ) : (
        <p className="m-12 text-4xl">{user.name} aún no publicó ningún texto</p>
      )}
    </div>
  );
}

export default UserPosts;
