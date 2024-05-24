import { MdDragIndicator } from "react-icons/md";
import RemoveCollectionPostButton from "./RemoveCollectionPostButton";

function CollectionPost({ post, index, dragHandleProps }) {
  return (
    <div
      key={post?.id}
      className="flex items-center justify-between gap-6 border-b-2 border-stone-400 p-2 backdrop-blur-sm"
    >
      <div {...dragHandleProps}>
        <MdDragIndicator className="h-10 w-10" />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-left font-semibold">{post?.title}</p>
        <p className="text-left">Escrito por {post?.author?.name}</p>
      </div>

      <RemoveCollectionPostButton postId={post?.id} index={index} />
    </div>
  );
}

export default CollectionPost;
