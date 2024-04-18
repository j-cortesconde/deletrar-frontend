import { HiPlus } from "react-icons/hi";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-[5%] right-[5%]">
      <Button
        size="medium"
        shape="round"
        onClick={() => navigate("/post/create")}
      >
        <HiPlus />
      </Button>
    </div>
  );
}

export default CreatePost;
