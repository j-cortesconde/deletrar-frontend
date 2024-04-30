import InviteForm from "../features/authentication/InviteForm";

function InviteFriend() {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="w-2/3">
        <h4 className="my-6 text-center text-5xl font-semibold">
          Invitar a un amigo
        </h4>
        <p className="text-left">
          ADVERTENCIA - Antes de invitar a alguien, tené en mente que cualquier
          tipo de conducta indebida de parte de tu invitado puede afectarte
          negativamente. En casos particularmente extremos, esto puede llegar a
          significar la suspensión de tu cuenta por tiempo indefinido.
        </p>
        <p className="text-left">
          Esto no es decir que no invites a nadie, ni que lo hagas con miedo.
          Por el contrario, ¡nos encanta agrandar la comunidad!
        </p>
        <p className="text-left">
          Pero es justamente por la dedicación y el cuidado que le ponemos a
          nuestra comunidad que te pedimos que administres tus invitaciones
          concientemente. Si tenés dudas, te invitamos a revisar las políticas o
          a contactarte con un administrador.
        </p>
      </div>
      <div className="w-2/3 p-10">
        <InviteForm />
      </div>
    </div>
  );
}

export default InviteFriend;
