import { useForm } from "react-hook-form";
import { useRequestAccount } from "./useRequestAccount";

import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";

function RequestAccountForm() {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const { requestAccount, isLoading } = useRequestAccount();

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
          disabled={isLoading}
          register={{
            ...register("name", { required: "Este campo es obligatorio" }),
          }}
        />
      </FormRow>
      <FormRow label="Correo electrónico" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          disabled={isLoading}
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
          disabled={isLoading}
          register={{
            ...register("request", {
              required: "Este campo es obligatorio",
            }),
          }}
        />
      </FormRow>
      <FormRow
        label="Nombre de usuario de un amigo"
        error={errors?.friendUsername?.message}
      >
        <Input
          type="text"
          id="friendUsername"
          disabled={isLoading}
          register={{
            ...register("friendUsername", {
              pattern: {
                value: /^[a-zA-Z0-9._]+$/,
                message: "Por favor ingresá una nombre de usuario válido",
              },
            }),
          }}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Solicitar Invitación" : "Esperá"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default RequestAccountForm;
