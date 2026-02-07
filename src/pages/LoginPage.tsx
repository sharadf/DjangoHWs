import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';

const LoginPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/todo" replace />;
  }

  return <LoginForm />;
};

export default LoginPage;
