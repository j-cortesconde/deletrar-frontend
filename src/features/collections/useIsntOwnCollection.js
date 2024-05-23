// TODO: Should actually redirect to error page (that take in as prop an err.message)
import { useQueryClient } from "@tanstack/react-query";

export function useIsntOwnCollection(collection) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  const isntOwnCollection =
    collection?.collector.username &&
    collection?.collector.username !== user?.username;

  return isntOwnCollection;
}
