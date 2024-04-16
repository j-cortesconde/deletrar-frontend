// import styled from "styled-components";
// import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCurrentUser } from "../users/useCurrentUser";

// const FullPage = styled.div`
//   height: 100dvh;
//   background-color: var(--color-grey-50);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isLoading, user, isFetching } = useCurrentUser();
  const navigate = useNavigate();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!user && !isLoading && !isFetching) navigate("/login");
    },
    [user, isLoading, isFetching, navigate],
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <div>Loading</div>
      // <FullPage>
      //   <Spinner />
      // </FullPage>
    );

  // 4. If there IS a user, render the app
  if (user) return children;
}

export default ProtectedRoute;
