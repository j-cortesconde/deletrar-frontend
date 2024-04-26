import { Link, useNavigate } from "react-router-dom";

function UserResult({ selected = false, to, result }) {
  const navigate = useNavigate();

  const baseStyle =
    "border-stone-300 p-0.5 w-full my-1 hover:bg-slate-300 hover:cursor-pointer truncate px-2 py-1";
  const selectedStyle = " bg-slate-400 font-semibold";
  const style = selected ? baseStyle + selectedStyle : baseStyle;

  return (
    <li className={style} onClick={() => navigate(to)}>
      <Link to={to} className="m-2 flex items-end gap-3 align-middle">
        <img
          src={`/users/${result.photo}`}
          alt={result.name}
          className="w-16 rounded-full"
        />
        <div className="flex items-center gap-2">
          <p>{result.name}</p>

          <p className="text-lg">- {result.username}</p>
        </div>
      </Link>
    </li>
  );
}

export default UserResult;
