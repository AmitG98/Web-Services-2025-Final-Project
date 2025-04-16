// src/App.jsx
import React from "react";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import MainProgramPage from "./pages/MainProgramPage.jsx";
import MoreInfo from "./pages/MoreInfo.jsx";
import Profiles from "./pages/Profiles.jsx";
import ProgramGridPage from "./pages/ProgramGridPage.jsx";
// import SecureAccess from "./routes/SecureAccess.jsx";
// import Home from "./pages/admin/AdminHome.jsx";
// import Logs from "./pages/admin/Logs.jsx";
// import DataManagement from "./pages/admin/DataManagement.jsx";
// import ProgramForm from "./pages/admin/ProgramForm.jsx";
import { UserSessionProvider } from "./context/UserSessionProvider";
import { AuthUserProvider } from "./hooks/useUserAuth";
import { SearchGlobalProvider } from "./hooks/useGlobalSearch";
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
  // {
  //   path: "/admin-dashboard",
  //   element: (
  //     <SecureAccess requireAdmin>
  //       <Home />
  //     </SecureAccess>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: (
  //         <SecureAccess requireAdmin>
  //           <Logs />
  //         </SecureAccess>
  //       ),
  //     },
  //     {
  //       path: "data-management",
  //       element: (
  //         <SecureAccess requireAdmin>
  //           <DataManagement />
  //         </SecureAccess>
  //       ),
  //     },
  //     {
  //       path: "add-program",
  //       element: (
  //         <SecureAccess requireAdmin>
  //           <ProgramForm />
  //         </SecureAccess>
  //       ),
  //     },
  //   ],
  // },
  { path: "/profiles", element: <Profiles /> },
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
  {
    path: "/program/:id",
    element: <MoreInfo />,
  },
  {
    path: "/new&popular",
    element: (
      <ProgramGridPage
        title="New & Popular"
        query="newest"
        type="movie"
        activePage="new&popular"
      />
    ),
  },
  {
    path: "/my-list",
    element: (
      <ProgramGridPage
        title="My List"
        query="myList"
        type="movie"
        activePage="my-list"
      />
    ),
  },
]);

const App = () => {
  return (
    <UserSessionProvider>
      <AuthUserProvider>
        <SearchGlobalProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>{" "}
        </SearchGlobalProvider>
      </AuthUserProvider>
    </UserSessionProvider>
  );
};

export default App;
