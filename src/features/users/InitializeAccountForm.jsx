// FIXME: Conectar username con backend así se agrega como validación de datos
import { useForm } from "react-hook-form";

import { useInitializeAccount } from "./useInitializeAccount";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

function InitializeAccountForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { initializeAccount, isPending } = useInitializeAccount();

  function onSubmit({ username }) {
    initializeAccount({ username });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nombre de usuario" error={errors?.username?.message}>
        <Input
          type="text"
          id="username"
          disabled={isPending}
          register={{
            ...register("username", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._]+$/,
                message:
                  "Por favor ingresá una nombre de usuario válido (sólo puede contener letras, numeros, puntos y guiones bajos).",
              },
            }),
          }}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isPending}>
          {!isPending ? "Seleccionar" : "Esperar"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default InitializeAccountForm;
