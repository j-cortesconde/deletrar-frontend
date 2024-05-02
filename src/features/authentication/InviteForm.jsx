import { useNavigate, useSearchParams } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useInviteFriend } from "./useInviteFriend";

function InviteForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: searchParams.get("email"),
    },
  });
  const { errors } = formState;

  const { inviteFriend, isPending } = useInviteFriend();

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
    <Form appLayout="internal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nombre" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
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
          {!isPending ? "Enviar Invitación" : "Esperar"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default InviteForm;
