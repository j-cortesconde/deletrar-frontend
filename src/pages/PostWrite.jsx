import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import PostEditor from "../features/posts/PostEditor";
import toast from "react-hot-toast";
import { useCurrentUser } from "../features/users/useCurrentUser";
import { useCreatePost } from "../features/posts/useCreatePost";

function PostWrite() {
  const quillRef = useRef();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const { createPost, isCreating } = useCreatePost();
  const { user } = useCurrentUser();
  const author = user?._id;

  function handleSave(isPosting = false) {
    if (title === "" || summary === "") {
      return toast.error("El texto debe tener un título y un resumen");
    }
    const post = { title, summary, content, author };
    if (isPosting) post.status = "posted";

    createPost(post);
  }

  function handleChange() {
    if (quillRef.current) {
      const delta = quillRef.current.getEditor().getContents();
      setContent(delta);
    }
  }
  return (
    <>
      {isCreating && <Loader />}
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
          <Button variation="danger" disabled={isCreating}>
            Eliminar
          </Button>

          <p className="text-2xl">Guardado hace:...</p>

          <div className="space-x-5">
            <Button
              onClick={() => handleSave()}
              disabled={isCreating}
              variation="secondary"
            >
              Guardar
            </Button>
            <Button onClick={() => handleSave(true)} disabled={isCreating}>
              Guardar y Publicar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostWrite;
