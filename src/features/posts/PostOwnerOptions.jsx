import { useNavigate } from "react-router-dom";
import { useUndeletePost } from "./useUndeletePost";

import Button from "../../ui/Button";
import PostStatus from "./PostStatus";
import Loader from "../../ui/Loader";

function PostOwnerOptions({ post }) {
  const navigate = useNavigate();
  const { undeletePost, isUndeleting } = useUndeletePost();

  function handleClick() {
    if (post.status === "deleted") {
      undeletePost(post._id);
    } else {
      navigate(`/post/write/${post._id}`);
    }
  }

  return (
    <>
      {isUndeleting && <Loader />}
      <div className="flex flex-col">
        <PostStatus status={post?.status} />
        <Button size="small" variation="secondary" onClick={handleClick}>
          {post?.status === "deleted" ? "Recuperar" : "Editar"}
        </Button>
      </div>
    </>
  );
}

export default PostOwnerOptions;
