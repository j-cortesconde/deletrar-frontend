import { useNavigate } from "react-router-dom";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Loader from "../../ui/Loader";
import { useCurrentUser } from "./useCurrentUser";
import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useUpdateMe } from "./useUpdateMe";

function UserSettings() {
  const navigate = useNavigate();
  const { user, isLoading } = useCurrentUser();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: user?.name,
      description: user?.description,
      publicAccount: user?.settings?.publicAccount,
      publicEditing: user?.settings?.publicEditing,
      receivingInvitationRequests: user?.settings?.receivingInvitationRequests,
    },
  });
  const { isUpdating, updateMe } = useUpdateMe();

  function onSubmit({
    name,
    description,
    image,
    publicAccount,
    publicEditing,
    receivingInvitationRequests,
  }) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("publicAccount", publicAccount);
    formData.append("publicEditing", publicEditing);
    formData.append("receivingInvitationRequests", receivingInvitationRequests);
    updateMe(formData);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="m-auto flex w-3/4 flex-col">
      <h1 className="text-left">Editar Perfil</h1>
      <img src={user.photo} alt={user.name} className="w-52" />

      <Form appLayout="internal" onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Nombre" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            autoComplete="name"
            disabled={isUpdating}
            register={{
              ...register("name"),
            }}
          />
        </FormRow>
        <FormRow label="Descripción" error={errors?.description?.message}>
          <Textarea
            id="description"
            disabled={isUpdating}
            register={{
              ...register("description"),
            }}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </FormRow>

        <FormRow label="Foto de Perfil" error={errors?.image?.message}>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Input
                type="file"
                accept="image/*"
                id="image"
                disabled={isUpdating}
                onChange={(e) => {
                  const file = e.target.files[0];

                  // Validate the file type (check if it's an image)
                  if (file && !file.type.startsWith("image/")) {
                    // If the file is not an image, set an error
                    setError("image", {
                      type: "manual",
                      message: "Sólo se permiten archivos de imagen.",
                    });
                  } else {
                    // If valid, clear the error and set the file
                    clearErrors("image");
                    field.onChange(file);
                  }
                }}
              />
            )}
          />
        </FormRow>

        <FormRow
          label="Visibilidad de Cuenta"
          error={errors?.publicAccount?.message}
        >
          <div
            className="grid grid-cols-[5fr_1fr]"
            id="publicAccount"
            type="checkbox"
          >
            <p>
              ¿Desea que su cuenta y todo su contenido (textos, colecciones,
              comentarios, publicaciones compartidas) sean públicamente
              visibles?
            </p>
            <input
              type="checkbox"
              id="publicAccount"
              disabled={isUpdating}
              {...register("publicAccount")}
            />
          </div>
        </FormRow>
        <FormRow
          label="Visibilidad de Documentos no Publicados"
          error={errors?.publicEditing?.message}
        >
          <div
            className="grid grid-cols-[5fr_1fr]"
            id="publicEditing"
            type="checkbox"
          >
            <p>
              ¿Desea que los documentos que aún no ha publicado sean accesibles
              para quien posea su enlace?
            </p>
            <input
              type="checkbox"
              id="publicEditing"
              disabled={isUpdating}
              {...register("publicEditing")}
            />
          </div>
        </FormRow>
        <FormRow
          label="Recibir Solicitudes de Invitación"
          error={errors?.receivingInvitationRequests?.message}
        >
          <div
            className="grid grid-cols-[5fr_1fr]"
            id="receivingInvitationRequests"
            type="checkbox"
          >
            <p>
              ¿Desea que lectores que no tienen cuenta puedan solicitarles una
              invitación para crearse una cuenta?
            </p>
            <input
              type="checkbox"
              id="receivingInvitationRequests"
              disabled={isUpdating}
              {...register("receivingInvitationRequests")}
            />
          </div>
        </FormRow>

        <FormRow orientation="horizontal">
          <Button
            type="button"
            size="large"
            variation="secondary"
            disabled={isUpdating}
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button size="wide" disabled={isUpdating || !isValid}>
            {!isUpdating ? "Actualizar información" : "Esperar"}
          </Button>
        </FormRow>
      </Form>
    </div>
  );
}

export default UserSettings;
