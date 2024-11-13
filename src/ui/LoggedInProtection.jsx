// TODO: IS THIS OK? Just checking there's something loaded to ["user"]? Can't it be tricked?

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

function LoggedInProtection() {
  const navigate = useNavigate();

  // 1. Get the authenticated user
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  // 2. If there is authenticated user, redirect to /user/[username]/posts
  useEffect(
    function () {
      if (user) navigate(`/user/${user.username}/posts`, { replace: true });
    },
    [user, navigate],
  );

  // 4. If there ISnt a user, allow the render
  if (!user) return <Outlet />;
}

export default LoggedInProtection;
