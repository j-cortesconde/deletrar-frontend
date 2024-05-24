import CollectionPostButtons from "./CollectionPostButtons";

function CollectionPost({ post, index }) {
  return (
    <div
      key={post?.id}
      className="my-3 flex cursor-move select-none items-center justify-between gap-6 border-b-2 border-stone-400 p-2"
    >
      <p className="text-4xl">{index + 1}</p>
      <div className="flex flex-col items-start">
        <p className="text-left font-semibold">{post?.title}</p>
        <p className="text-left">Escrito por {post?.author?.name}</p>
      </div>

      <CollectionPostButtons postId={post?.id} index={index} />
    </div>
  );
}

export default CollectionPost;
