import { useParams } from "react-router-dom";
import { useSearchUsers } from "../features/search/useSearchUsers";
import UserCard from "../features/users/UserCard";

function UserSearchResults() {
  const { searchTerm } = useParams();
  const {
    isFetching: fetchingUsers,
    users,
    error: usersError,
  } = useSearchUsers(searchTerm);

  return (
    <div className="flex justify-center">
      <ul className="w-7/12">
        {users?.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </ul>
    </div>
  );
}

export default UserSearchResults;
