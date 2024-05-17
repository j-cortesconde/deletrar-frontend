import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayoutExt from "./ui/AppLayoutExt";
import AppLayoutInt from "./ui/AppLayoutInt";
import AccountStatusProtection from "./ui/AccountStatusProtection";
import LoginProtection from "./ui/LoginProtection";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import UserLayout from "./pages/UserLayout";
import Login from "./pages/Login";
import PostWrite from "./pages/PostWrite";
import UserSearchResults from "./pages/UserSearchResults";
import PostSearchResults from "./pages/PostSearchResults";
import RequestAccount from "./pages/RequestAccount";
import InviteFriend from "./pages/InviteFriend";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ReactivateAccount from "./pages/ReactivateAccount";
import InitializeAccount from "./pages/InitializeAccount";
import UserPosts from "./features/users/UserPosts";
import UserFollowers from "./features/users/UserFollowers";
import UserFollowing from "./features/users/UserFollowing";
import UserCollections from "./features/users/UserCollections";

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
              <Route path="user/settings" />
              <Route path="post/write/:postId" element={<PostWrite />} />
            </Route>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="users/:searchTerm" element={<UserSearchResults />} />
            <Route path="posts/:searchTerm" element={<PostSearchResults />} />
            <Route path="post/:postId" element={<PostDetail />} />
            <Route path="user/:username" element={<UserLayout />}>
              <Route index element={<Navigate replace to="posts" />} />
              <Route path="posts" element={<UserPosts />} />
              <Route path="collections" element={<UserCollections />} />
              <Route path="subscribers" element={<UserFollowers />} />
              <Route path="subscribed" element={<UserFollowing />} />
            </Route>
          </Route>
          <Route element={<AppLayoutExt />}>
            <Route element={<LoginProtection />}>
              <Route
                path="account/reactivate"
                element={<ReactivateAccount />}
              />
              <Route
                path="account/initialize"
                element={<InitializeAccount />}
              />
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
