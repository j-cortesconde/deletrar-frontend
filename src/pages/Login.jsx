import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";

// const LoginLayout = styled.main`
//   min-height: 100vh;
//   display: grid;
//   grid-template-columns: 48rem;
//   align-content: center;
//   justify-content: center;
//   gap: 3.2rem;
//   background-color: var(--color-grey-50);
// `;

function Login() {
  return (
    <main className="grid min-h-screen grid-cols-1 content-center justify-center gap-14 bg-stone-200 sm:grid-cols-[648px]">
      <Logo />
      <h4 className="text-center text-5xl font-semibold">
        Log in to your account
      </h4>
      <LoginForm />
    </main>
  );
}

export default Login;
