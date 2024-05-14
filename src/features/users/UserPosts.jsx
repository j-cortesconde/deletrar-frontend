// FIXME: Aun no resolvi como voy a hacer para traer solo los textos autorizados (ni como distinguir la info que traigo de otros de la mia)
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import SortBy from "../../ui/SortBy";
import CardList from "../../ui/CardList";
import { usePosts } from "../posts/usePosts";
import Loader from "../../ui/Loader";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RxDividerVertical } from "react-icons/rx";

function UserPosts() {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user", username]);
  const { posts, count, isLoading } = usePosts(username);

  const sortOptions = [
    {
      value: "postedAt-desc",
      label: "Fecha de publicación (nuevo)",
    },
    {
      value: "postedAt-asc",
      label: "Fecha de publicación (viejo)",
    },
    {
      value: "updatedAt-desc",
      label: "Fecha de actualización (nuevo)",
    },
    {
      value: "updatedAt-asc",
      label: "Fecha de actualización (viejo)",
    },
  ];

  // This should return a spinner Loader instead of this one that veils the screen so the user can see the rest of the page as this loads
  if (isLoading) return <Loader />;

  return (
    <div>
      {posts?.length > 0 ? (
        <>
          <div className="grid grid-cols-3 px-5">
            <p className="place-self-start">
              {posts.length}/{count} textos publicados
            </p>

            <div className="grid grid-cols-5 place-self-center">
              <div className="col-span-2 flex items-center justify-end">
                <div
                  className="flex items-center gap-1 hover:cursor-pointer"
                  onClick={() => console.log("Previous page")}
                >
                  <BiLeftArrow />
                  <p>Anterior</p>
                </div>
              </div>

              <RxDividerVertical className="col-span-1 col-start-3 col-end-4 place-self-center" />

              <div className="col-span-2 flex items-center justify-start">
                <div
                  className="flex items-center gap-1 hover:cursor-pointer"
                  onClick={() => console.log("Next page")}
                >
                  <p>Siguiente</p>
                  <BiRightArrow />
                </div>
              </div>
            </div>

            <div className="place-self-end">
              <SortBy options={sortOptions} />
            </div>
          </div>

          <CardList posts={posts} />
        </>
      ) : (
        <p className="m-12 text-4xl">{user.name} aún no publicó ningún texto</p>
      )}
    </div>
  );
}

export default UserPosts;
