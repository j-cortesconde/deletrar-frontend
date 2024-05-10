// TODO: Handler Functions
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";

function UserInfo({ user }) {
  const queryClient = useQueryClient();
  const ownUser = queryClient.getQueryData(["user"]);

  const isOwnUser = user._id === ownUser?._id;
  const isFollowing = ownUser?.following?.includes(user._id);
  const isLoggedIn = !!ownUser;

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

  return (
    <div className="mb-8 mt-4 flex items-start justify-between gap-4">
      <div className="flex flex-grow items-end justify-start gap-8">
        <div className="w-52 flex-shrink-0">
          <img src={`/users/${user.photo}`} alt={user.name} className="w-52" />
        </div>

        <div className="flex flex-col flex-wrap items-start text-left">
          <p className="text-4xl font-semibold">{user.name}</p>
          <p className="text-xl">488 suscriptores</p>
          <p className="text-3xl">
            Aqui me pongo a cnatar al compas de la viguela quel homrbo que lo
            desvela una pena straordinaria comol ave solitaria con el cantar se
            consuela
          </p>
        </div>
      </div>

      {isLoggedIn &&
        (isOwnUser ? (
          <div>
            <Button size="large" variation="secondary" onClick={handleEdit}>
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
                {isFollowing ? "Desuscribirse" : "Suscribirse"}
              </Button>
            </div>
          </>
        ))}
    </div>
  );
}

export default UserInfo;
