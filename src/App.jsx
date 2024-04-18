import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import { Home } from "./pages/Home";
import { PostDetail } from "./pages/PostDetail";
import { UserDetail } from "./pages/UserDetail";
import Login from "./pages/Login";
import { PostWrite } from "./pages/PostWrite";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="post/create" element={<PostWrite />} />
            <Route path="post/:postId" element={<PostDetail />} />
            <Route path="user/:userId" element={<UserDetail />} />
          </Route>
          <Route path="login" element={<Login />} />
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
