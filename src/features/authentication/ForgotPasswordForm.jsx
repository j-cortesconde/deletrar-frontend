import { useForm } from "react-hook-form";
import useForgotPassword from "./useForgotPassword";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useNavigate } from "react-router-dom";

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const { forgotPassword, isPending } = useForgotPassword();

  function onSubmit({ email }) {
    forgotPassword({ email });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
          {!isPending ? "Solicitar Reinicio" : "Esperar"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default ForgotPasswordForm;
