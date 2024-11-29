// TODO: See of setting maxLength to summary (and adding a way to load other post fields, like coverImage or subtitle)
// TODO: Must reject (redirect) any collections with status === "deleted" to wherever they are reactivated (collectionDetail probably)
// TODO: REFACTOR THIS MESS

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
import { useErrorHandler } from "../hooks/useErrorHandler";

import Loader from "../ui/Loader";
import CollectionPosts from "../features/collections/CollectionPosts";
import EditorButtons from "../ui/EditorButtons";

function CollectionCreate() {
  const navigate = useNavigate();
  const { collectionId } = useParams();

  const {
    collection,
    isLoading: isGetting,
    error,
  } = useCollection(collectionId);
  useErrorHandler(error);

  const { updateCollection, isUpdating } = useUpdateCollection();
  const { deleteCollection, isDeleting } = useDeleteCollection();
  const { createCollection, isCreating } = useCreateCollection();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [summary, setSummary] = useState("");
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);

  const newCollection = {
    title: title || "Colección sin título",
    summary: summary || "Resumen de la colección",
    subtitle,
    posts,
    status: "editing",
  };

  const isLoading = isGetting || isUpdating || isDeleting || isCreating;

  const autoSaveStatus = useAutoSaveCollection(
    autoSaveEnabled,
    collectionId,
    newCollection,
  );

  const { isntOwnCollection } = useIsntOwnCollection(collection);

  useEffect(() => {
    if (isntOwnCollection) {
      toast.error(
        "No sos propietario de la colección que estás intentando modificar.",
      );
      navigate("/home", { replace: true });
    }
  }, [isntOwnCollection, navigate]);

  useEffect(() => {
    if (collection?.status === "deleted")
      navigate(`/collection/${collection._id}`, { replace: true });

    if (!isGetting) {
      setTitle(collection?.title || "");
      setSubtitle(collection?.subtitle || "");
      setSummary(collection?.summary || "");
      setPosts(collection?.posts || []);

      setAutoSaveEnabled(collection?.status !== "posted");
    }
  }, [collection, isGetting, navigate]);

  function onDelete() {
    deleteCollection(collectionId);
  }

  function onSave(isSharing = false) {
    if (imageError) {
      return toast.error(imageError);
    }

    if (title === "" || summary === "") {
      return toast.error("La colección debe tener un título y un resumen");
    }

    if (isSharing) {
      if (newCollection.posts.length < 2)
        return toast.error(
          "La colección debe tener al menos dos textos antes de poder ser compartida",
        );
      else newCollection.status = "posted";
    }

    updateCollection(
      { collectionId, newCollection, image },
      {
        onSuccess: () => {
          setImage(null);
        },
      },
    );
  }

  function onCopy() {
    const copyTitle = title ? "Copia de " + title : "Colección sin título";
    const copySummary = summary || "Resumen...";

    const copyCollection = {
      title: copyTitle,
      summary: copySummary,
      subtitle,
      posts,
      status: "editing",
    };

    if (image) copyCollection.image = image;

    createCollection(copyCollection, {
      onSuccess: () => {
        setImage(null);
      },
    });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file);
        setImageError("");
      } else {
        setImage(null);
        setImageError("Sólo se permiten archivos de imagen.");
      }
    } else {
      setImage(null);
    }
  };

  if (error) return <div>{error.response.data.message}</div>;

  return (
    <>
      {isLoading && <Loader />}
      <div className="mx-auto flex h-full w-3/4 flex-col items-center">
        <input
          type="text"
          maxLength={40}
          autoFocus
          placeholder="Título..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="m-2 w-full border-2 border-stone-400 p-4 text-4xl"
        />
        <textarea
          placeholder="Resumen..."
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="m-2 w-full border-2 border-stone-400 p-4 text-xl"
        />

        <div className="m-2 w-full">
          <div className="flex items-center gap-6">
            <label htmlFor="image" className="text-4xl">
              Portada de la Colección:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="flex flex-1 rounded-sm border-2 border-stone-400 bg-stone-50 px-5 py-3 shadow-sm"
            />
          </div>
          <p className="mt-2 w-full text-left text-3xl text-red-700">
            {imageError}
          </p>
        </div>

        <CollectionPosts posts={collection?.posts} />

        <EditorButtons
          isLoading={isLoading}
          handleDelete={onDelete}
          handleSave={() => onSave()}
          handlePost={() => onSave(true)}
          handleCopy={onCopy}
          isPosted={collection?.status === "posted"}
          autoSaveEnabled={autoSaveEnabled}
          autoSaveStatus={autoSaveStatus}
        />
      </div>
    </>
  );
}

export default CollectionCreate;
