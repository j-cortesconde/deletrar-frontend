import { Link } from "react-router-dom";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";

function Login() {
  return (
    <main className="grid min-h-screen grid-cols-1 content-center justify-center gap-14 bg-stone-200 p-10 sm:grid-cols-[648px]">
      <Logo size="large" />
      <h4 className="text-center text-5xl font-semibold">Iniciá sesión</h4>
      <Link to={"/forgot-password"} className="mx-16 text-right underline">
        ¿Olvidaste tu contraseña?
      </Link>
      <LoginForm />
    </main>
  );
}

export default Login;
