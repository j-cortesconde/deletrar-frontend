import RequestAccountForm from "../features/authentication/RequestAccountForm";

function RequestAccount() {
  return (
    <>
      <h4 className="text-center text-5xl font-semibold">Solicitar Cuenta</h4>
      <p className="text-justify">
        Para poder escribir y publicar textos es necesario tener una cuenta y
        para eso es necesario recibir una invitación. A continuación podés
        ingresar tus datos y el nombre de usuario de algún amigo para pedirle
        que te invite. Si no conocés a nadie que ya tenga cuenta, no te
        preocupes: dejá el último campo vacío y un administrador va a revisar tu
        solicitud.
      </p>
      <RequestAccountForm />
    </>
  );
}

export default RequestAccount;
