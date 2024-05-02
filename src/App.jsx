import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayoutInt from "./ui/AppLayoutInt";
import { Home } from "./pages/Home";
import { PostDetail } from "./pages/PostDetail";
import { UserDetail } from "./pages/UserDetail";
import Login from "./pages/Login";
import { PostWrite } from "./pages/PostWrite";
import { Toaster } from "react-hot-toast";
import UserSearchResults from "./pages/UserSearchResults";
import PostSearchResults from "./pages/PostSearchResults";
import RequestAccount from "./pages/RequestAccount";
import InviteFriend from "./pages/InviteFriend";
import AppLayoutExt from "./ui/AppLayoutExt";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LoginProtection from "./ui/LoginProtection";
import AccountStatusProtection from "./ui/AccountStatusProtection";
import ReactivateAccount from "./pages/ReactivateAccount";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AccountStatusProtection>
                <AppLayoutInt />
              </AccountStatusProtection>
            }
          >
            <Route element={<LoginProtection />}>
              <Route path="users/invite" element={<InviteFriend />} />
              <Route path="post/create" element={<PostWrite />} />
            </Route>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="users/:searchTerm" element={<UserSearchResults />} />
            <Route path="posts/:searchTerm" element={<PostSearchResults />} />
            <Route path="post/:postId" element={<PostDetail />} />
            <Route path="user/:userId" element={<UserDetail />} />
          </Route>
          <Route element={<AppLayoutExt />}>
            <Route element={<LoginProtection />}>
              <Route
                path="account/reactivate"
                element={<ReactivateAccount />}
              />
              <Route path="account/initialize" element={<AppLayoutInt />} />
            </Route>
            <Route path="account/request" element={<RequestAccount />} />
            <Route path="account/login" element={<Login />} />
            <Route path="password/forgot" element={<ForgotPassword />} />
            <Route
              path="password/reset/:resetToken"
              element={<ResetPassword />}
            />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "rgb(51 65 85 / 1)",
            color: "white",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
