import { useNavigate } from "react-router-dom";

function PostCard({ keyProp, post }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate(`/post/${post._id}`)}
      className="m-5 rounded-md border-2 border-slate-400 bg-slate-300 hover:cursor-pointer"
    >
      <div className="my-14 flex items-center justify-end gap-10">
        <img
          src={`/posts/${post.coverImage}`}
          alt={`${post.title}'s cover`}
          className="max-w-[20%]"
        />
        <div className="mx-10 w-[60%] text-left">
          <p className="text-4xl font-semibold">{post.title}</p>
          <p className="text-2xl">
            Un texto escrito por{" "}
            <span className="font-semibold">{post.author.name}</span>
          </p>
          <p className="text-2xl">{post.summary}</p>
        </div>
      </div>
    </li>
  );
}

export default PostCard;
