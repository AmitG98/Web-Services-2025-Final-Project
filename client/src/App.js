// src/App.jsx
import React from "react";
import Register from "./pages/Register";
import { UserSessionProvider } from "./context/UserSessionProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import ProtectedRoute from "./routes/SecureAccess";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/home",
  //   element: (
  //     <ProtectedRoute>
  //       <Home />
  //     </ProtectedRoute>
  //   ),
  // },
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
