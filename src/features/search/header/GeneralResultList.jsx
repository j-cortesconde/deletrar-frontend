import { BiLoaderAlt } from "react-icons/bi";

import { useScrollList } from "../../../hooks/useScrollList";

import { SEARCH_RESULTS } from "../../../utils/constants";
import PostResultList from "./PostResultList";
import UserResultList from "./UserResultList";
import CollectionResultList from "./CollectionResultList";

function GeneralResultList({
  posts,
  users,
  collections,
  onCloseResults,
  isFetching,
  query,
}) {
  // Might bug. Read alert inside the custom hook's file
  const { listRef, selectedIndex } = useScrollList(onCloseResults);

  const countBeforeCollectionResults =
    posts?.length > SEARCH_RESULTS ? SEARCH_RESULTS + 1 : posts?.length;
  const countBeforeUserResults =
    (collections?.length > SEARCH_RESULTS
      ? SEARCH_RESULTS + 1
      : collections?.length) + countBeforeCollectionResults;

  // While fetching
  if (isFetching)
    return (
      <div className="absolute top-[110%] z-50 flex  w-[100%] items-center justify-center rounded-xl bg-slate-200">
        <p className="p-4 text-center text-3xl">Estamos buscando</p>
        <BiLoaderAlt className="animate-spin" />
      </div>
    );

  // When nothing found
  if (posts?.length === 0 && users?.length === 0 && collections?.length === 0)
    return (
      <div className="absolute top-[110%] z-50 w-[100%]  rounded-xl bg-slate-200">
        <p className="p-4 text-center text-3xl">
          Tu búsqueda no devolvió resultados.
        </p>
      </div>
    );

  // When something's found
  return (
    <ul
      ref={listRef}
      className="absolute top-[110%] z-50 w-[100%] gap-1 rounded-xl bg-slate-200"
    >
      {posts?.length > 0 && (
        <PostResultList
          posts={posts}
          query={query}
          selectedIndex={selectedIndex}
        />
      )}
      {collections?.length > 0 && (
        <CollectionResultList
          collections={collections}
          query={query}
          countBeforeCollectionResults={countBeforeCollectionResults}
          selectedIndex={selectedIndex}
        />
      )}
      {users?.length > 0 && (
        <UserResultList
          users={users}
          query={query}
          countBeforeUserResults={countBeforeUserResults}
          selectedIndex={selectedIndex}
        />
      )}
    </ul>
  );
}

export default GeneralResultList;
