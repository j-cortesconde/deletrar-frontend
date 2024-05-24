import { BiLoaderAlt } from "react-icons/bi";
import { useScrollList } from "../../../hooks/useScrollList";
import CollectionPostResult from "./CollectionPostResult";

function CollectionPostResults({
  isFetching,
  posts,
  onSelect,
  onCloseResults,
}) {
  const { listRef, selectedIndex } = useScrollList(onCloseResults);

  // While fetching
  if (isFetching)
    return (
      <div className="absolute top-[110%] z-50 flex  w-[100%] items-center justify-center rounded-xl bg-slate-400">
        <p className="p-4 text-center">Estamos buscando</p>
        <BiLoaderAlt className="animate-spin" />
      </div>
    );
  // When nothing found
  if (posts?.length === 0)
    return (
      <div className="absolute top-[110%] z-50 w-[100%]  rounded-xl bg-slate-400">
        <p className="p-4 text-center">Tu búsqueda no devolvió resultados.</p>
      </div>
    );

  return (
    // When something's found
    <ul
      ref={listRef}
      className="absolute top-[110%] z-50 w-[100%] gap-1 rounded-xl bg-slate-400"
    >
      {posts?.map((post, index) => (
        <CollectionPostResult
          key={post._id}
          onClick={() => onSelect(post)}
          post={post}
          selected={index === selectedIndex}
        />
      ))}
    </ul>
  );
}

export default CollectionPostResults;
