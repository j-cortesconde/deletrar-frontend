import ForgotPasswordForm from "../features/authentication/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <>
      <h4 className="text-center text-5xl font-semibold">
        Recuperar Contraseña
      </h4>
      <ForgotPasswordForm />
    </>
  );
}

export default ForgotPassword;
