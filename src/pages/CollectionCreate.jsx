// TODO: Must reject (redirect) any posts with status === "deleted" to wherever they are reactivated (postDetail probably)

import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCollection } from "../features/collections/useCollection";
import { useCreateCollection } from "../features/collections/useCreateCollection";
import { useDeleteCollection } from "../features/collections/useDeleteCollection";
import { useUpdateCollection } from "../features/collections/useUpdateCollection";
import { useAutoSaveCollection } from "../features/collections/useAutoSaveCollection";
import { useIsntOwnCollection } from "../features/collections/useIsntOwnCollection";

import Button from "../ui/Button";
import Loader from "../ui/Loader";
import CollectionPost from "../features/collections/CollectionPost";

function CollectionCreate() {
  const navigate = useNavigate();

  const { collectionId } = useParams();

  const {
    collection,
    isLoading: isGetting,
    error,
  } = useCollection(collectionId);

  //TODO: Change all of these
  const { updateCollection, isUpdating } = useUpdateCollection();
  const { deleteCollection, isDeleting } = useDeleteCollection();
  const { createCollection, isCreating } = useCreateCollection();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [summary, setSummary] = useState("");
  const [posts, setPosts] = useState([]);

  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);

  const newCollection = {
    title: title || "Colección sin título",
    summary: summary || "Resumen...",
    subtitle,
    posts,
    status: "saved",
  };

  const isLoading = isGetting || isUpdating || isDeleting || isCreating;

  // TODO: CHANGE
  const autoSaveStatus = useAutoSaveCollection(
    autoSaveEnabled,
    collectionId,
    newCollection,
  );

  // TODO: CHANGE
  const isntOwnCollection = useIsntOwnCollection(collection);

  useEffect(() => {
    if (isntOwnCollection) navigate("/home", { replace: true });
  }, [isntOwnCollection, navigate]);

  useEffect(() => {
    if (collection?.status === "deleted")
      navigate(`/collection/${collection._id}`, { replace: true });

    if (!isGetting) {
      setTitle(collection?.title || "");
      setSubtitle(collection?.subtitle || "");
      setSummary(collection?.summary || "");
      setPosts(collection?.posts || []);

      setAutoSaveEnabled(collection?.status !== "shared");
    }
  }, [collection, isGetting, navigate]);

  function handleSave(isSharing = false) {
    if (title === "" || summary === "") {
      return toast.error("La colección debe tener un título y un resumen");
    }

    if (isSharing) newCollection.status = "shared";

    updateCollection({ collectionId, newCollection });
  }

  function handleCopy() {
    const copyTitle = title ? "Copia de " + title : "Colección sin título";
    const copySummary = summary || "Resumen...";

    const copyCollection = {
      title: copyTitle,
      summary: copySummary,
      subtitle,
      posts,
      status: "saved",
    };

    createCollection(copyCollection);
  }

  if (error) return <div>{error.message}</div>;

  return (
    <>
      {isLoading && <Loader />}
      <div className="mx-auto flex h-full w-3/4 flex-col items-center">
        <input
          type="text"
          maxLength={120}
          placeholder="Título..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="m-2 w-full p-4 text-4xl"
        />
        <textarea
          placeholder="Resumen..."
          rows={3}
          maxLength={350}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="m-2 w-full p-4 text-xl"
        />

        <div className="w-3/4 ">
          {collection?.posts?.map((post, index) => (
            <CollectionPost key={post?.id} post={post} index={index} />
          ))}
        </div>

        {/* TODO: These buttons (here and in postWrite) should be refactored. If not together, at least to simplify the component structure */}
        <div className="my-1 flex w-full justify-between">
          <div className="space-x-5">
            <Button
              onClick={() => {
                deleteCollection(collectionId);
              }}
              variation="danger"
              disabled={isLoading}
            >
              Eliminar
            </Button>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              variation="secondary"
              disabled={isLoading}
            >
              Salir
            </Button>
          </div>

          <p className="text-2xl">
            {autoSaveEnabled ? autoSaveStatus : "Autoguardado desactivado"}
          </p>

          <div className="space-x-5">
            {collection?.status === "shared" ? (
              <Button
                onClick={() => handleCopy()}
                disabled={isLoading}
                variation="secondary"
              >
                Crear Copia
              </Button>
            ) : (
              <Button
                onClick={() => handleSave()}
                disabled={isLoading}
                variation="secondary"
              >
                Guardar sin Publicar
              </Button>
            )}

            <Button onClick={() => handleSave(true)} disabled={isLoading}>
              {collection?.status === "shared"
                ? "Guardar"
                : "Guardar y Publicar"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionCreate;
