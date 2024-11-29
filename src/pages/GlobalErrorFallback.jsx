import Button from "../ui/Button";

function GlobalErrorFallback({ resetErrorBoundary }) {
  return (
    <main className="flex h-screen items-center justify-center p-20">
      <div className="flex-shrink flex-grow-0 basis-[96rem] p-20 text-center">
        <h1 className="mb-6 text-5xl font-semibold">Algo salió mal 🧐</h1>
        <p>Tuvimos un problema con la página que querías ver.</p>
        <p className="mb-12">
          Volvé a intentar en otro momento o comunicate con un administrador.
        </p>

        <Button size="large" onClick={resetErrorBoundary}>
          Volver a Intentar
        </Button>
      </div>
    </main>
  );
}

export default GlobalErrorFallback;
