// src/App.jsx
import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainProgramPage from "./pages/MainProgramPage";
import { UserSessionProvider } from "./context/UserSessionProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import ProtectedRoute from "./routes/SecureAccess";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <MainProgramPage contentType="all" />,
  },
  {
    path: "/movies",
    element: <MainProgramPage contentType="movie" />,
  },
  {
    path: "/tv-shows",
    element: <MainProgramPage contentType="tv" />,
  },
]);

const App = () => {
  return (
    <UserSessionProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>{" "}
    </UserSessionProvider>
  );
};

export default App;
