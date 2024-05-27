import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { PiPen } from "react-icons/pi";
import { BiBook } from "react-icons/bi";

import { useCreatePost } from "../features/posts/useCreatePost";
import { useCreateCollection } from "../features/collections/useCreateCollection";

import Button from "./Button";
import Loader from "./Loader";

function CreateNewButton() {
  const [isActive, setIsActive] = useState(false);
  const { createPost, isCreating: isCreating1 } = useCreatePost();
  const { createCollection, isCreating: isCreating2 } = useCreateCollection();

  function toggleActivate() {
    setIsActive((prev) => !prev);
  }

  function handleCreatePost() {
    setIsActive(false);

    const newPost = {
      title: "Texto sin título",
      summary: "Resumen...",
      content: "",
      status: "editing",
    };
    createPost(newPost);
  }

  function handleCreateCollection() {
    setIsActive(false);

    const newCollection = {
      title: "Colección sin título",
      summary: "Resumen...",
      posts: [],
      status: "editing",
    };
    createCollection(newCollection);
  }

  if (isCreating1 || isCreating2) return <Loader />;

  return (
    <div className="fixed bottom-[5%] right-[5%] flex flex-col items-end">
      <div
        onClick={handleCreateCollection}
        className={`fixed bottom-[5%] right-[5%] z-0 mr-4 flex items-center gap-2 transition-all duration-300 hover:cursor-pointer ${isActive && "mb-40"}`}
      >
        {isActive && (
          <p className="font-bold backdrop-blur-xl">Crear Colección</p>
        )}
        <Button size="small" shape="round">
          <BiBook />
        </Button>
      </div>

      <div
        onClick={handleCreatePost}
        className={`fixed bottom-[5%] right-[5%] z-0 mr-4 flex items-center gap-2 transition-all duration-300 hover:cursor-pointer ${isActive && "mb-24"}`}
      >
        {isActive && <p className="font-bold backdrop-blur-xl">Crear Texto</p>}
        <Button size="small" shape="round">
          <PiPen />
        </Button>
      </div>

      <div className={`z-10 ${isActive ? "" : "fixed bottom-[5%] right-[5%]"}`}>
        <Button
          size="medium"
          shape="round"
          variation={isActive ? "danger" : "primary"}
          onClick={toggleActivate}
        >
          {isActive ? <HiMinus /> : <HiPlus />}
        </Button>
      </div>
    </div>
  );
}

export default CreateNewButton;
