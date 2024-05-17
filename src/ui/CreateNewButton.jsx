import { HiMinus, HiPlus } from "react-icons/hi";
import { useCreatePost } from "../features/posts/useCreatePost";
import Button from "./Button";
import Loader from "./Loader";
import { useState } from "react";
import { PiPen } from "react-icons/pi";
import { BiBook } from "react-icons/bi";

function CreateNewButton() {
  const [isActive, setIsActive] = useState(false);
  const { createPost, isCreating } = useCreatePost();

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

  if (isCreating) return <Loader />;

  return (
    <div className="fixed bottom-[5%] right-[5%] flex flex-col items-end">
      <div
        className={`fixed bottom-[5%] right-[5%] z-0 mr-4 flex items-center gap-2 transition-all duration-300 ${isActive && "mb-40"}`}
      >
        {isActive && (
          <p className="font-bold backdrop-blur-xl">Crear Colección</p>
        )}
        <Button
          size="small"
          shape="round"
          onClick={() => console.log("Acá botón 1. Estoy siendo clickeado")}
        >
          <BiBook />
        </Button>
      </div>

      <div
        className={`fixed bottom-[5%] right-[5%] z-0 mr-4 flex items-center gap-2 transition-all duration-300 ${isActive && "mb-24"}`}
      >
        {isActive && <p className="font-bold backdrop-blur-xl">Crear Texto</p>}
        <Button size="small" shape="round" onClick={handleCreatePost}>
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
