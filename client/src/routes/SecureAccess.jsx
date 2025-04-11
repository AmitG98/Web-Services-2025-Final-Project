import { Navigate, useLocation } from "react-router-dom";
import { useSessionContext } from "../context/UserSessionProvider";

const SecureAccess = ({ children, requireAdmin = false }) => {
  const { currentUser } = useSessionContext();
  const routeLocation = useLocation();

  if (!currentUser) {
    return <Navigate to="/signin" state={{ from: routeLocation }} replace />;
  }

  if (requireAdmin && currentUser.role !== "admin") {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};

export default SecureAccess;
