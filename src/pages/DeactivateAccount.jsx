import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useDeactivateAccount } from "../features/users/useDeactivateAccount";

import Button from "../ui/Button";

function DeactivateAccount() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { active } = queryClient.getQueryData(["user"]);

  useEffect(() => {
    if (!active) navigate("/home", { replace: true });
  }, [active, navigate]);

  const { isPending, deactivateAccount } = useDeactivateAccount();

  return (
    <>
      <h4 className="text-center text-5xl font-semibold">Desactivar Cuenta</h4>
      <>
        <p className="text-justify">
          No hay ningún problema, pero dejanos explicarte algunas cosas.
        </p>
        <p className="text-justify">
          1- Cuando desactives tu cuenta, tus textos, colecciones, compartidos y
          comentarios publicados se van a desactivar y van a dejar de ser
          visibles.
          <br />
          2- Tus conversaciones van a seguir siendo visibles para los otros
          participantes, pero ya no se mostrará en ellas la información de tu
          cuenta.
          <br />
          3- Todos tus textos y colecciones (publicados o inéditos),
          conversaciones y comentarios quedarán guardados por si decidís volver.
          <br />
          4- Para reactivar tu cuenta sólo tenés que volver a iniciar sesión con
          tus credenciales. Si pasa tanto tiempo que las olvidás, no te
          preocupes: siempre podrás recuperarlas.
          <br />
          5- Una cuenta reactivada recupera todos sus textos, colecciones,
          seguidores, comentarios, compartidos y conversaciones. Los documentos
          publicados (que habrán quedado inactivos) vuelven a publicarse
          automáticamente. Los inéditos siguen guardados como tales.
          <br />
          ¡Gracias por acompañarnos y éxitos con tus lecturas!
        </p>
      </>

      <div className="flex gap-4">
        <Button
          size="large"
          variation="primary"
          onClick={() => navigate(-1)}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button
          size="wide"
          variation="danger"
          onClick={() => deactivateAccount()}
          disabled={isPending}
        >
          {!isPending ? "Desactivar Cuenta" : "Esperar"}
        </Button>
      </div>
    </>
  );
}

export default DeactivateAccount;
