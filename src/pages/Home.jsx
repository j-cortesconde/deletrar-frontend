import { login } from "../services/apiAuth";

export function Home() {
  const email = "jcortesconde@gmail.com";
  const password = "password1234";
  login({ email, password });
  return <div>Home</div>;
}
