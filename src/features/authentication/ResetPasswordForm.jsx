import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "./useResetPassword";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

function ResetPasswordForm() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const { resetPassword, isLoading } = useResetPassword();

  function onSubmit({ password, passwordConfirm }) {
    resetPassword({ password, passwordConfirm, token: resetToken });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nueva contraseña" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="password"
          disabled={isLoading}
          register={{
            ...register("password", {
              required: "Este campo es obligatorio",
            }),
          }}
        />
      </FormRow>
      <FormRow
        label="Confirmar contraseña"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          register={{
            ...register("passwordConfirm", {
              required: "Este campo es obligatorio",
              validate: (value, formValues) =>
                formValues.password === value ||
                "Las contraseñas tienen que coincidir",
            }),
          }}
        />
      </FormRow>
      <FormRow orientation="horizontal">
        <Button
          type="button"
          size="large"
          variation="secondary"
          disabled={isLoading}
          onClick={() => navigate("/home")}
        >
          Cancelar
        </Button>
        <Button size="wide" disabled={isLoading}>
          {!isLoading ? "Confirmar Nueva Contraseña" : "Esperá"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default ResetPasswordForm;
