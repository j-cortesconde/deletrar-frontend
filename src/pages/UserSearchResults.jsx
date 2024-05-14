import { useParams } from "react-router-dom";
import { useSearchUsers } from "../features/search/useSearchUsers";

import CardList from "../ui/CardList";

function UserSearchResults() {
  const { searchTerm } = useParams();
  const {
    isFetching: fetchingUsers,
    users,
    error: usersError,
  } = useSearchUsers(searchTerm);

  return (
    <div className="mx-auto flex w-3/4 justify-center">
      <CardList users={users}/>
    </div>
  );
}

export default UserSearchResults;
