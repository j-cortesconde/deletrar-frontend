import { useSearchParams } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useInviteFriend } from "./useInviteFriend";

function InviteForm() {
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: searchParams.get("email"),
    },
  });
  const { errors } = formState;

  const { inviteFriend, isLoading } = useInviteFriend();

  function onSubmit({ name, email }) {
    inviteFriend(
      { name, email },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  }

  return (
    <Form type="inAppLayoutInt" onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        orientation="horizontal"
        label="Nombre"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          register={{
            ...register("name", { required: "Este campo es obligatorio" }),
          }}
        />
      </FormRow>
      <FormRow
        orientation="horizontal"
        label="Correo electrónico"
        error={errors?.email?.message}
      >
        <Input
          type="email"
          id="email"
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
      <FormRow>
        <Button disabled={isLoading}>
          {!isLoading ? "Enviar Invitación" : "Esperá"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default InviteForm;
