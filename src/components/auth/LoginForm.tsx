import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const [form, setForm] = useState({ email: '', password: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(form);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="auth-panel">
      <h2>Вход</h2>

      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Пароль"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">Войти</button>

      {/* 👇 НОВЫЙ БЛОК */}
      <p className="auth-link">
        Не зарегистрирован?{' '}
        <Link to="/register">Создать аккаунт</Link>
      </p>
    </form>
  );
};
