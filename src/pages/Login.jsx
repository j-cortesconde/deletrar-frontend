import { Link } from "react-router-dom";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <>
      <h4 className="text-center text-5xl font-semibold">Iniciá sesión</h4>
      <Link to={"/forgot-password"} className="mx-16 text-right underline">
        ¿Olvidaste tu contraseña?
      </Link>
      <LoginForm />
    </>
  );
}

export default Login;
