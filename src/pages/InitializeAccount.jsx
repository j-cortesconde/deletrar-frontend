import InitializeAccountForm from "../features/users/InitializeAccountForm";

function InitializeAccount() {
  return (
    <>
      <h4 className="text-center text-5xl font-semibold">Activar Cuenta</h4>

      <p className="text-justify">¡Bienvenido a Deletrar!</p>
      <p className="text-justify">
        Si estás leyendo este mensaje es porque alguien te invitó a unirte a
        Deletrar. Quizás haya sido algún amigo o quizás un administrador, pero
        en todo caso estamos todos contentos de tenerte acá.
      </p>
      <p className="text-justify">
        Si no leiste todavía las políticas y las recomendaciones de uso de
        Deletrar, te invitamos a que lo hagas. Si ya lo hiciste sólo queda un
        paso antes de que puedas empezar a usar tu nueva cuenta: ¡elegir un
        nombre de usuario!
      </p>
      <InitializeAccountForm />
    </>
  );
}

export default InitializeAccount;
