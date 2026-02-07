import { useAuth } from "../../hooks/useAuth";

const AuthPanel = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
<div className="auth">      
  <span>Welcome, {user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AuthPanel;
