// FIXME: Aun no resolvi como voy a hacer para traer solo los textos autorizados (ni como distinguir la info que traigo de otros de la mia)
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { usePosts } from "../posts/usePosts";

import Loader from "../../ui/Loader";
import CardList from "../../ui/CardList";
import TableOperations from "../../ui/TableOperations";
import Pagination from "../../ui/Pagination";
import { POST_SORT_OPTIONS } from "../../utils/constants";

function UserPosts() {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user", username]);
  const { posts, count, isLoading } = usePosts(username);

  // TODO: This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads
  if (isLoading) return <Loader />;

  return (
    <div>
      {count > 0 ? (
        <>
          <TableOperations
            totalAmount={count}
            sortOptions={POST_SORT_OPTIONS}
          />

          <CardList posts={posts} />

          <Pagination totalAmount={count} />
        </>
      ) : (
        <p className="m-12 text-4xl">{user.name} aún no publicó ningún texto</p>
      )}
    </div>
  );
}

export default UserPosts;
