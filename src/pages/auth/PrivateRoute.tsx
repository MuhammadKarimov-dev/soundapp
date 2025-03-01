import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactElement;
  allowedRole: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthenticated = !!user.token;
  const hasCorrectRole = user.role === allowedRole;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!hasCorrectRole) {
    // Agar foydalanuvchi roli to'g'ri kelmasa, asosiy sahifaga qaytarish
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
