// FIXME: How does one connect the images from the frontend to the backend?

import { useParams } from "react-router-dom";
import { useUser } from "../features/users/useUser";

import Loader from "../ui/Loader";
import UserInfo from "../features/users/UserInfo";
import UserMenu from "../features/users/UserMenu";

function UserDetail() {
  const { username } = useParams();

  const { isLoading, user, error } = useUser(username);

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="mx-auto w-3/4">
      <UserInfo user={user} />

      <UserMenu />
    </div>
  );
}

export default UserDetail;
