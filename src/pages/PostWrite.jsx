// TODO: See of setting maxLength to summary (and adding a way to load other post fields, like coverImage)
// TODO: Must reject (redirect) any posts with status === "deleted" to wherever they are reactivated (postDetail probably)

import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { usePost } from "../features/posts/usePost";
import { useUpdatePost } from "../features/posts/useUpdatePost";
import { useDeletePost } from "../features/posts/useDeletePost";
import { useCreatePost } from "../features/posts/useCreatePost";
import { useAutoSavePost } from "../features/posts/useAutoSavePost";
import { useIsntOwnPost } from "../features/posts/useIsntOwnPost";

import Loader from "../ui/Loader";
import PostEditor from "../features/posts/PostEditor";
import EditorButtons from "../ui/EditorButtons";

function PostWrite() {
  const navigate = useNavigate();
  const quillRef = useRef();

  const { postId } = useParams();

  const { post, isLoading: isGetting, error } = usePost(postId);
  const { updatePost, isUpdating } = useUpdatePost();
  const { deletePost, isDeleting } = useDeletePost();
  const { createPost, isCreating } = useCreatePost();

  const [title, setTitle] = useState(post?.title || "");
  const [summary, setSummary] = useState(post?.summary || "");
  const [content, setContent] = useState(post?.content || "");
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const newPost = {
    title: title || "Texto sin título",
    summary: summary || "Resumen...",
    content: { ...content },
    status: "editing",
  };

  const isLoading = isGetting || isUpdating || isDeleting || isCreating;

  const autoSaveStatus = useAutoSavePost(autoSaveEnabled, postId, newPost);

  const isntOwnPost = useIsntOwnPost(post);

  useEffect(() => {
    if (isntOwnPost) navigate("/home", { replace: true });
  }, [isntOwnPost, navigate]);

  useEffect(() => {
    if (post?.status === "deleted")
      navigate(`/post/${post._id}`, { replace: true });

    if (!isGetting) {
      setTitle(post?.title || "");
      setSummary(post?.summary || "");
      setContent(post?.content || "");
      setAutoSaveEnabled(post?.status !== "posted");
    }
  }, [post, isGetting, navigate]);

  function handleChange() {
    if (quillRef.current) {
      const delta = quillRef.current.getEditor().getContents();
      setContent(delta);
    }
  }

  function onDelete() {
    deletePost(postId);
  }

  function onSave(isPosting = false) {
    if (imageError) {
      return toast.error(imageError);
    }

    if (title === "" || summary === "") {
      return toast.error("El texto debe tener un título y un resumen");
    }

    if (isPosting) newPost.status = "posted";

    updatePost(
      { postId, newPost, image },
      {
        onSuccess: () => {
          setImage(null);
        },
      },
    );
  }

  function onCopy() {
    const copyTitle = title ? "Copia de " + title : "Texto sin título";
    const copySummary = summary || "Resumen...";

    const copyPost = {
      title: copyTitle,
      summary: copySummary,
      content,
      status: "editing",
    };
    if (image) copyPost.image = image;

    createPost(copyPost, {
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
      <div className="m-auto flex h-full w-3/4 flex-col items-center">
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
          className="m-2 min-h-[7.65rem] w-full border-2 border-stone-400 p-4 text-xl"
        />

        <div className="m-2 w-full">
          <div className="flex items-center gap-6">
            <label htmlFor="image" className="text-4xl">
              Portada del Texto:
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

        <PostEditor
          quillRef={quillRef}
          value={content}
          handleChange={handleChange}
          className="m-2 flex w-full flex-grow flex-col"
        />

        <EditorButtons
          isLoading={isLoading}
          handleDelete={onDelete}
          handleSave={() => onSave()}
          handlePost={() => onSave(true)}
          handleCopy={onCopy}
          isPosted={post?.status === "posted"}
          autoSaveEnabled={autoSaveEnabled}
          autoSaveStatus={autoSaveStatus}
        />
      </div>
    </>
  );
}

export default PostWrite;
