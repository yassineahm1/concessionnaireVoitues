import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RequireRole({ role, children }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/comptes/signin" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/voitures" replace />;
  }

  return children;
}
