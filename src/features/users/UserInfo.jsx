// TODO: Improve error handling (actually in all the app)
import { useUser } from "./useUser";
import { useIsFollowerAmFollowing } from "./useIsFollowerAmFollowing";
import { useFollowUnfollowUser } from "./useFollowUnfollowUser";
import { useIsOwnUser } from "./useIsOwnUser";

import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const navigate = useNavigate();
  const { isOwnUser, username, ownUser } = useIsOwnUser();

  const {
    isLoading: isLoadingUser,
    user,
    error: userError,
  } = useUser(username);
  const { isPending, followUnfollowUser } = useFollowUnfollowUser();

  const {
    isLoading: isLoadingFollowStatus,
    error: followStatusError,
    amFollowing,
    isFollower,
  } = useIsFollowerAmFollowing(username);

  const isLoggedIn = !!ownUser;
  const error = userError || followStatusError;

  function handleMessage() {
    navigate(`/conversations/user/${username}`);
  }
  function handleFollowUnfollow() {
    if (amFollowing) followUnfollowUser({ username, unfollow: true });
    else followUnfollowUser({ username, unfollow: false });
  }
  function handleEdit() {
    navigate("/user/settings");
  }

  if (isLoadingUser) return <Loader />;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="my-4 flex items-start justify-between gap-8">
      <div className="w-52 flex-shrink-0">
        <img src={user.photo} alt={user.name} className="w-52" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <div className="flex flex-grow justify-start">
            <div className="flex flex-col flex-wrap items-start text-left">
              <p className="text-6xl font-semibold">{user.name}</p>
              <p className="mt-1 text-xl">
                {user.followerAmount || "Aún no tiene"} suscriptor
                {user.followerAmount > 1 && "es"}
                {isLoggedIn && isFollower && <span> | Es un suscriptor</span>}
              </p>
            </div>
          </div>

          <div>
            {isLoggedIn &&
              (isOwnUser ? (
                <div>
                  <Button
                    size="large"
                    variation="secondary"
                    onClick={handleEdit}
                  >
                    Editar
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex gap-4">
                    <Button variation="secondary" onClick={handleMessage}>
                      Contactar
                    </Button>
                    <Button
                      onClick={handleFollowUnfollow}
                      variation={amFollowing ? "danger" : "primary"}
                      disabled={isPending}
                    >
                      {isLoadingFollowStatus || isPending
                        ? "Esperá"
                        : amFollowing
                          ? "Desuscribirse"
                          : "Suscribirse"}
                    </Button>
                  </div>
                </>
              ))}
          </div>
        </div>

        <p className="mt-1 text-left text-3xl">{user.description}</p>
      </div>
    </div>
  );
}

export default UserInfo;
