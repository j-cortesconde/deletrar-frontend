// TODO: Must reject (redirect) any collections with status === "deleted" to wherever they are reactivated (collectionDetail probably)
// TODO: Create a CollectionDetail page

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
    status: "editing",
  };

  const isLoading = isGetting || isUpdating || isDeleting || isCreating;

  const autoSaveStatus = useAutoSaveCollection(
    autoSaveEnabled,
    collectionId,
    newCollection,
  );

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

      setAutoSaveEnabled(collection?.status !== "posted");
    }
  }, [collection, isGetting, navigate]);

  function onDelete() {
    deleteCollection(collectionId);
  }

  function onSave(isSharing = false) {
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

    updateCollection({ collectionId, newCollection });
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
