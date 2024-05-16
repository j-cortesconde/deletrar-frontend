// TODO: Handler Functions
// TODO: Improve error handling (actually in all the app)
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import { useIsFollowingIsFollower } from "./useIsFollowerIsFollowing";
import Loader from "../../ui/Loader";
import { useParams } from "react-router-dom";
import { useUser } from "./useUser";

function UserInfo() {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const {
    isLoading: isLoadingUser,
    user,
    error: userError,
  } = useUser(username);

  const {
    isLoading: isLoadingFollowStatus,
    error: followStatusError,
    isFollowing,
    isFollower,
  } = useIsFollowingIsFollower(username);

  //TODO: What can we do if the user is a follower?

  const isOwnUser = username === ownUser?.username;
  const isLoggedIn = !!ownUser;
  const error = userError || followStatusError;

  function handleMessage() {
    console.log("Message Action Triggered");
  }
  function handleFollow() {
    if (isFollowing) console.log("Unfollow Action Triggered");
    else console.log("Follow Action Triggered");
  }
  function handleEdit() {
    console.log("Edit Action Triggered");
  }

  if (isLoadingUser) return <Loader />;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="my-4 flex items-start justify-between gap-8">
      <div className="w-52 flex-shrink-0">
        <img src={`/users/${user.photo}`} alt={user.name} className="w-52" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <div className="flex flex-grow justify-start">
            <div className="flex flex-col flex-wrap items-start text-left">
              <p className="text-6xl font-semibold">{user.name}</p>
              {/* // TODO: .followers not yet implemented at backend */}
              <p className="mt-1 text-xl">
                {user.followers?.length || "Aún no tiene"} suscriptores
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
                      onClick={handleFollow}
                      variation={isFollowing ? "danger" : "primary"}
                    >
                      {isLoadingFollowStatus
                        ? "Esperá"
                        : isFollowing
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
