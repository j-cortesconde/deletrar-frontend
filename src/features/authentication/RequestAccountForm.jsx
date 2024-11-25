import { useForm } from "react-hook-form";
import { useRequestAccount } from "./useRequestAccount";

import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useNavigate } from "react-router-dom";

function RequestAccountForm() {
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const { requestAccount, isPending } = useRequestAccount();

  function onSubmit({ name, email, request, friendUsername }) {
    requestAccount({ name, email, request, friendUsername });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nombre" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          autoComplete="name"
          disabled={isPending}
          register={{
            ...register("name", { required: "Este campo es obligatorio" }),
          }}
        />
      </FormRow>
      <FormRow label="Correo electrónico" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          disabled={isPending}
          register={{
            ...register("email", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message:
                  "Por favor ingresá una dirección de correo electrónico válida",
              },
            }),
          }}
        />
      </FormRow>
      <FormRow label="Mensaje de solicitud" error={errors?.request?.message}>
        <Textarea
          id="request"
          disabled={isPending}
          register={{
            ...register("request", {
              required: "Este campo es obligatorio",
            }),
          }}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </FormRow>
      <FormRow
        label="Nombre de usuario de un amigo"
        error={errors?.friendUsername?.message}
      >
        <Input
          type="text"
          id="friendUsername"
          disabled={isPending}
          register={{
            ...register("friendUsername", {
              pattern: {
                value: /^[a-zA-Z0-9._]+$/,
                message:
                  "Por favor ingresá una nombre de usuario válido (sólo puede contener letras, numeros, puntos y guiones bajos).",
              },
            }),
          }}
        />
      </FormRow>
      <FormRow orientation="horizontal">
        <Button
          type="button"
          size="large"
          variation="secondary"
          disabled={isPending}
          onClick={() => navigate(-1)}
        >
          Cancelar
        </Button>
        <Button size="wide" disabled={isPending}>
          {!isPending ? "Solicitar Invitación" : "Esperar"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default RequestAccountForm;
