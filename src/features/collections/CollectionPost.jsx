import { MdDragIndicator } from "react-icons/md";
import RemoveCollectionPostButton from "./RemoveCollectionPostButton";

function CollectionPost({ post, index, dragHandleProps }) {
  return (
    <div
      key={post?.id}
      className="grid grid-cols-[1fr_9fr_3fr] border-b-2 border-stone-400 p-2 backdrop-blur-sm"
    >
      <div {...dragHandleProps} className="flex items-center justify-start">
        <MdDragIndicator className="h-10 w-10" />
      </div>

      <div className="flex flex-col items-start">
        <p className="text-left font-semibold">{post?.title}</p>
        <p className="text-left">
          Escrito por {post?.author?.name} - {post?.author?.username}
        </p>
        {!(post.status === "posted") && (
          <p className="text-left text-xl font-semibold text-red-400">
            De momento este texto no se encuentra disponible
          </p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <RemoveCollectionPostButton postId={post?.id} index={index} />
      </div>
    </div>
  );
}

export default CollectionPost;
