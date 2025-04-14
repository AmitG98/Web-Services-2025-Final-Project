import { Navigate, useLocation } from "react-router-dom";
import { useSessionContext } from "../context/UserSessionProvider";

const SecureAccess = ({ children, requireAdmin = false }) => {
  const { currentUser } = useSessionContext();
  const routeLocation = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: routeLocation }} replace />;
  }

  if (requireAdmin && currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SecureAccess;
