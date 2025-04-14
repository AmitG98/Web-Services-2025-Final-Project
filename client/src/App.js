// src/App.jsx
import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SecureAccess from "./routes/SecureAccess.jsx";
import Home from "./pages/admin/AdminHome.jsx";
import Logs from "./pages/admin/Logs.jsx";
import DataManagement from "./pages/admin/DataManagement.jsx";
import ProgramForm from "./pages/admin/ProgramForm.jsx";
import { UserSessionProvider } from "./context/UserSessionProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Home from "./pages/Home";
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
    path: "/admin-dashboard",
    element: (
      <SecureAccess requireAdmin>
        <Home />
      </SecureAccess>
    ),
    children: [
      {
        index: true,
        element: (
          <SecureAccess requireAdmin>
            <Logs />
          </SecureAccess>
        ),
      },
      {
        path: "data-management",
        element: (
          <SecureAccess requireAdmin>
            <DataManagement />
          </SecureAccess>
        ),
      },
      {
        path: "add-program",
        element: (
          <SecureAccess requireAdmin>
            <ProgramForm />
          </SecureAccess>
        ),
      },
    ],
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
