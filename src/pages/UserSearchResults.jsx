import { useParams } from "react-router-dom";

import { useSearchUsers } from "../features/search/useSearchUsers";
import { useErrorHandler } from "../hooks/useErrorHandler";

import CardList from "../ui/CardList";

function UserSearchResults() {
  const { searchTerm } = useParams();
  const {
    isFetching: fetchingUsers,
    users,
    error,
  } = useSearchUsers(searchTerm);
  useErrorHandler(error);

  return (
    <div className="mx-auto flex w-3/4 justify-center">
      <CardList users={users} />
    </div>
  );
}

export default UserSearchResults;
