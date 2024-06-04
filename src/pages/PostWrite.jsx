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
    if (title === "" || summary === "") {
      return toast.error("El texto debe tener un título y un resumen");
    }

    if (isPosting) newPost.status = "posted";

    updatePost({ postId, newPost });
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

    createPost(copyPost);
  }

  if (error) return <div>{error.message}</div>;

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
