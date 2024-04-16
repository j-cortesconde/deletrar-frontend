import { useQueryClient } from "@tanstack/react-query";

function UserHeader() {
  const queryClient = useQueryClient();
  const { user } = queryClient.getQueryData(["user"]);

  return <div className="">{user.name}</div>;
}

export default UserHeader;
