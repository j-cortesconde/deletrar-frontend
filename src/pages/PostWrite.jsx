import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useCreatePost } from "../features/posts/useCreatePost";
import { useUpdatePost } from "../features/posts/useUpdatePost";

import Button from "../ui/Button";
import Loader from "../ui/Loader";
import PostEditor from "../features/posts/PostEditor";

function PostWrite() {
  const quillRef = useRef();
  const { createPost, isCreating } = useCreatePost();
  const { updatePost, isUpdating } = useUpdatePost();

  const { postId } = useParams();

  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["post", postId]);

  const [title, setTitle] = useState(post?.title || "");
  const [summary, setSummary] = useState(post?.summary || "");
  const [content, setContent] = useState(post?.content || "");

  const isLoading = isUpdating || isCreating;

  function handleSave(isPosting = false) {
    if (title === "" || summary === "") {
      return toast.error("El texto debe tener un título y un resumen");
    }
    const newPost = { title, summary, content };

    newPost.status = isPosting ? "posted" : "editing";

    if (postId) {
      updatePost({ postId, newPost });
    } else {
      createPost(newPost);
    }
  }

  function handleChange() {
    if (quillRef.current) {
      const delta = quillRef.current.getEditor().getContents();
      setContent(delta);
    }
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
          <Button variation="danger" disabled={isLoading}>
            Eliminar
          </Button>

          <div className="space-x-5">
            <Button
              onClick={() => handleSave()}
              disabled={isLoading}
              variation="secondary"
            >
              {postId ? "Guardar y Dejar de Publicar" : "Guardar"}
            </Button>
            <Button onClick={() => handleSave(true)} disabled={isLoading}>
              {postId ? "Guardar y Seguir Publicando" : "Guardar y Publicar"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostWrite;
