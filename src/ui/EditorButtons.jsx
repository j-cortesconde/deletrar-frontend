import { useNavigate } from "react-router-dom";
import Button from "./Button";

function EditorButtons({
  isLoading,
  handleDelete,
  handleCopy,
  handleSave,
  handlePost,
  isPosted,
  autoSaveEnabled,
  autoSaveStatus,
}) {
  const navigate = useNavigate();

  return (
    <div className="my-1 flex w-full justify-between">
      <div className="space-x-5">
        <Button onClick={handleDelete} variation="danger" disabled={isLoading}>
          Eliminar
        </Button>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          variation="secondary"
          disabled={isLoading}
        >
          Salir
        </Button>
      </div>

      <p className="text-2xl">
        {autoSaveEnabled ? autoSaveStatus : "Autoguardado desactivado"}
      </p>

      <div className="space-x-5">
        {isPosted ? (
          <Button
            onClick={handleCopy}
            disabled={isLoading}
            variation="secondary"
          >
            Crear Copia
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            disabled={isLoading}
            variation="secondary"
          >
            Guardar sin Publicar
          </Button>
        )}

        <Button onClick={handlePost} disabled={isLoading}>
          {isPosted ? "Guardar" : "Guardar y Publicar"}
        </Button>
      </div>
    </div>
  );
}

export default EditorButtons;
