import { useNavigate } from "react-router-dom";
import { SEARCH_RESULTS } from "../../utils/constants";
import UserResult from "./UserResult";
import ScrollableLi from "../../ui/ScrollableLi";

function UserResultList({
  users,
  query,
  countBeforeUserResults,
  selectedIndex,
}) {
  const navigate = useNavigate();

  const usersAmount = users?.length;
  const trimmedUsers = usersAmount > 0 ? users.slice(0, SEARCH_RESULTS) : [];
  const trimmedUsersAmount =
    usersAmount > SEARCH_RESULTS ? SEARCH_RESULTS : usersAmount;

  return (
    <li>
      <p
        key={`users-title-${query}`}
        className="rounded-t-xl border-b-2 border-slate-300 bg-slate-300 px-2 py-2 font-semibold"
      >
        Usuarios
      </p>
      <ul>
        {trimmedUsers.map((result, index) => (
          <UserResult
            key={result.username}
            selected={countBeforeUserResults + index === selectedIndex}
            to={`/user/${result.username}`}
            result={result}
          />
        ))}
        {trimmedUsersAmount < usersAmount && (
          <ScrollableLi
            key={`users-link-${query}`}
            selected={countBeforeUserResults + SEARCH_RESULTS === selectedIndex}
            onClick={() => navigate(`/users/${query}`)}
          >
            Ver más...
          </ScrollableLi>
        )}
      </ul>
    </li>
  );
}

export default UserResultList;
