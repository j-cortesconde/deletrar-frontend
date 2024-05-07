import { HiPlus } from "react-icons/hi";
import { useCreatePost } from "./useCreatePost";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";

function CreatePost() {
  const { createPost, isCreating } = useCreatePost();

  function handleClick() {
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
    <div className="fixed bottom-[5%] right-[5%]">
      <Button size="medium" shape="round" onClick={handleClick}>
        <HiPlus />
      </Button>
    </div>
  );
}

export default CreatePost;
