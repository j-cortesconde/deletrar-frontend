import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useReactivateAccount } from "../features/users/useReactivateAccount";

import Button from "../ui/Button";

function ReactivateAccount() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { active } = queryClient.getQueryData(["user"]);

  useEffect(() => {
    if (active) navigate("/home", { replace: true });
  }, [active, navigate]);

  const { isPending, reactivateAccount } = useReactivateAccount();

  return (
    <>
      <h4 className="text-center text-5xl font-semibold">Cuenta Desactivada</h4>
      <>
        <p className="text-justify">¡Qué bueno que volviste!</p>
        <p className="text-justify">
          Parece que en algún momento decidiste desactivar tu cuenta, pero nos
          alegra que hayas vuelto a la comunidad. Si tu regreso fue accidental y
          querés que tu cuenta siga desactivada, no te preocupes: de momento tu
          cuenta y todo su contenido asociado sigue siendo invisible a todos los
          usuarios. Si, en cambio, quisieras reactivarla, sólo basta con que
          hagas click en el botón que aparece abajo.
        </p>
      </>
      <Button
        size="large"
        onClick={() => reactivateAccount()}
        disabled={isPending}
      >
        {!isPending ? "Reactivar Cuenta" : "Esperar"}
      </Button>
    </>
  );
}

export default ReactivateAccount;
