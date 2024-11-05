import { Navigate } from "react-router-dom";

function ProtectedRoute({ authKey, children }) {
  if (!authKey) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoute;
