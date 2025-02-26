import { useState } from "react";
import { useLogin } from "./useLogin";

import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("mgonzalez@deletrar.com");
  const [password, setPassword] = useState("DeletrarGuest!2025");
  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setPassword("");
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Correo electrónico">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label="Contraseña">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
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
          {!isPending ? "Iniciar Sesión" : "Esperar"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
