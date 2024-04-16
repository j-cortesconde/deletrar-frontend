import { useCurrentUser } from "../features/users/useCurrentUser";

export function Home() {
  const some = useCurrentUser();
  return <div>Home</div>;
}
