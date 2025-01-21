// TODO: Se agregó info de cada uno de los posts. Se puede mapear el array de posts (o los primeros X (o los primeros X y hover:los demás)) y mostrar los principales (que además de traer info de c/post traen info de c/autor)
import { useNavigate } from "react-router-dom";
import { longDate, shortDate } from "../../utils/dateFormat";

function CollectionCard({ collection }) {
  const navigate = useNavigate();

  let statusMessage;

  switch (collection.status) {
    case "posted":
      statusMessage = "";
      break;
    case "deleted":
      statusMessage = "[eliminado]";
      break;
    case "editing":
      statusMessage = "[editando]";
      break;
    default:
      statusMessage = "[inédito]";
      break;
  }

  return (
    <li
      onClick={() => navigate(`/collection/${collection._id}`)}
      className={`m-5 select-none hyphens-auto break-words rounded-md border-2 border-neutral-400 bg-white hover:cursor-pointer`}
    >
      {/* <div className="my-8 flex items-start justify-center"> */}

      <div className="mx-6 my-4 flex flex-col items-center gap-4 text-center">
        <div>
          <p className="text-4xl font-semibold underline">
            {collection.title} {statusMessage}
          </p>
          {collection.collector?.name && (
            <p className="text-2xl">
              Una colección creada por{" "}
              <span className="font-semibold">{collection.collector.name}</span>
            </p>
          )}
          <p className="text-2xl">
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
        </div>

        <img
          src={collection.coverImage}
          alt={`${collection.title}'s cover`}
          className="max-h-40 w-full overflow-hidden object-cover"
        />

        <p className="mt-1 flex-wrap whitespace-pre-wrap text-2xl">
          {collection.summary}
        </p>
      </div>
      {/* </div> */}
    </li>
  );
}

export default CollectionCard;
