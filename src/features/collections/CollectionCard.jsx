import { useNavigate } from "react-router-dom";
import { longDate, shortDate } from "../../utils/dateFormat";

function CollectionCard({ collection }) {
  const navigate = useNavigate();

  const statusStyle = {
    posted: "border-slate-400 bg-slate-300",
    editing: "border-amber-400 bg-amber-300",
    deleted: "border-red-400 bg-red-300",
  };

  return (
    <li
      onClick={() => navigate(`/collection/${collection._id}`)}
      className={`m-5 rounded-md border-2 hover:cursor-pointer ${statusStyle[collection.status || "posted"]}`}
    >
      <div className="my-8 flex items-start justify-center">
        <img
          src={`/collections/${collection.coverImage}`}
          alt={`${collection.title}'s cover`}
          className="max-w-[20%]"
        />
        <div className="mx-6 w-[60%] text-left">
          <p className="text-4xl font-semibold">{collection.title}</p>
          {collection.collector?.name && (
            <p className="mt-1 text-2xl">
              Un texto escrito por {collection.collector.name}
            </p>
          )}
          <p className="mt-1 text-2xl">
            {collection.postedAt
              ? `Publicada el ${longDate(collection.postedAt)}`
              : "Colección inédita"}
          </p>

          {collection.updatedAt &&
            collection.updatedAt !== collection.postedAt && (
              <p className="text-xl">
                (Actualizada el {shortDate(collection.updatedAt)})
              </p>
            )}
          <p className="mt-1 text-2xl">{collection.summary}</p>
        </div>
      </div>
    </li>
  );
}

export default CollectionCard;
