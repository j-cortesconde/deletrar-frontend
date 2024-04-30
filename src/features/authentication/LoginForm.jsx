import { useState } from "react";
import { useLogin } from "./useLogin";

import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function LoginForm() {
  const [email, setEmail] = useState("jcortesconde@gmail.com");
  const [password, setPassword] = useState("password1234");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
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
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Contraseña">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Iniciar Sesión" : "Esperá"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
