// TODO: IS THIS OK? Just checking there's something loaded to ["user"]? Can't it be tricked?

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

function LoginProtection() {
  const navigate = useNavigate();

  // 1. Get the authenticated user
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!user) navigate("/account/login", { replace: true });
    },
    [user, navigate],
  );

  // 4. If there IS a user, render the app
  if (user) return <Outlet />;
}

export default LoginProtection;
