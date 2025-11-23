import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
