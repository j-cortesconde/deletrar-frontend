import { Link } from "react-router-dom";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <>
      <h4 className="text-center text-5xl font-semibold">Iniciá Sesión</h4>
      <Link to={"/password/forgot"} className="mx-16 text-right underline">
        ¿Olvidaste tu contraseña?
      </Link>
      <LoginForm />
    </>
  );
}

export default Login;
