import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate(`/user/${user.username}`)}
      className="m-5 hyphens-auto break-words rounded-md border-2 border-neutral-400 bg-white hover:cursor-pointer"
    >
      <div className="my-4 flex items-center justify-end gap-4">
        <img
          src={user.photo}
          alt={`${user.name}`}
          className="aspect-square max-w-[20%] rounded-full object-cover"
        />
        <div className="mx-10 w-[60%] text-justify">
          <p className="text-4xl font-semibold">{user.name}</p>
          <p className="text-2xl">{user.username}</p>
          <p className="flex-wrap whitespace-pre-wrap text-2xl">
            {user.description}
          </p>
        </div>
      </div>
    </li>
  );
}

export default UserCard;
