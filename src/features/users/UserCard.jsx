import { useNavigate } from "react-router-dom";

function UserCard({ user }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate(`/user/${user.username}`)}
      className="m-5 rounded-md border-2 border-slate-400 bg-slate-300 hover:cursor-pointer"
    >
      <div className="my-14 flex items-center justify-end gap-10">
        <img
          src={user.photo}
          alt={`${user.name}`}
          className="max-w-[20%] rounded-full"
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
