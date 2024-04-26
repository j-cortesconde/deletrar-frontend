import { Link, useNavigate } from "react-router-dom";
import SearchLi from "../../ui/SearchLi";

function UserResult({ selected = false, to, result }) {
  const navigate = useNavigate();

  return (
    <SearchLi selected={selected} onClick={() => navigate(to)}>
      <Link to={to} className="m-2 flex items-center gap-3 align-middle">
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
    </SearchLi>
  );
}

export default UserResult;
