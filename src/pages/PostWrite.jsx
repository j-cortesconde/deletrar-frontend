// TODO: Must reject (redirect) any posts with status === "deleted" to wherever they are reactivated (postDetail probably)

import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { usePost } from "../features/posts/usePost";
import { useUpdatePost } from "../features/posts/useUpdatePost";
import { useDeletePost } from "../features/posts/useDeletePost";

import Button from "../ui/Button";
import Loader from "../ui/Loader";
import PostEditor from "../features/posts/PostEditor";
import { useAutoSave } from "../features/posts/useAutoSave";

function PostWrite() {
  const quillRef = useRef();

  const { postId } = useParams();

  const { post, isLoading: isGetting } = usePost(postId);
  const { updatePost, isUpdating } = useUpdatePost();
  const { deletePost, isDeleting } = useDeletePost();

  const [title, setTitle] = useState(post?.title || "");
  const [summary, setSummary] = useState(post?.summary || "");
  const [content, setContent] = useState(post?.content || "");
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);

  const newPost = {
    title,
    summary,
    content: { ...content },
    status: "editing",
  };

  const isLoading = isUpdating || isDeleting || isGetting;

  const isAutoSaving = useAutoSave(autoSaveEnabled, postId, newPost);

  useEffect(() => {
    if (!isGetting) {
      setTitle(post?.title || "");
      setSummary(post?.summary || "");
      setContent(post?.content || "");
      setAutoSaveEnabled(post?.status !== "posted");
    }
  }, [post, isGetting]);

  function handleChange() {
    if (quillRef.current) {
      const delta = quillRef.current.getEditor().getContents();
      setContent(delta);
    }
  }

  function handleSave(isPosting = false) {
    if (title === "" || summary === "") {
      return toast.error("El texto debe tener un título y un resumen");
    }

    if (isPosting) newPost.status = "posted";

    updatePost({ postId, newPost });
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex h-full flex-col items-center">
        <input
          type="text"
          maxLength={120}
          placeholder="Título..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="m-2 w-3/4 p-4 text-4xl"
        />
        <textarea
          placeholder="Resumen..."
          rows={3}
          maxLength={350}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="m-2 w-3/4 p-4 text-xl"
        />

        <PostEditor
          quillRef={quillRef}
          value={content}
          handleChange={handleChange}
          className="m-2 flex h-full w-3/4 flex-1 flex-col"
        />

        <div className="my-1 flex w-3/4 justify-between">
          <Button
            onClick={() => {
              deletePost(postId);
            }}
            variation="danger"
            disabled={isLoading}
          >
            Eliminar
          </Button>

          {autoSaveEnabled && (
            <p className="text-2xl">
              {isAutoSaving ? "Guardando automáticamente" : "Guardado"}
            </p>
          )}

          <div className="space-x-5">
            {post?.status !== "posted" && (
              <Button
                onClick={() => handleSave()}
                disabled={isLoading}
                variation="secondary"
              >
                Guardar sin Publicar
              </Button>
            )}

            <Button onClick={() => handleSave(true)} disabled={isLoading}>
              {post?.status === "posted" ? "Guardar" : "Guardar y Publicar"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostWrite;
