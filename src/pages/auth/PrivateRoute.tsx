import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = localStorage.getItem("user"); // Login qilinganini tekshiramiz

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
