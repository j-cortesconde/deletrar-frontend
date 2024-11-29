import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex h-screen items-center justify-center p-20">
      <div className="flex-shrink flex-grow-0 basis-[96rem] p-20 text-center">
        <h1 className="mb-12 text-5xl font-semibold">
          No pudimos encontrar la página que estabas buscando
        </h1>
        <Button onClick={() => navigate(-1)} size="large">
          &larr; Volver Atrás
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
