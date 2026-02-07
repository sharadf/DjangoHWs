import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { register } = useAuth();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      register(form);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="auth-panel">
      <h2>Регистрация</h2>

      <input placeholder="Имя" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Пароль" onChange={e => setForm({ ...form, password: e.target.value })} />
      <input type="password" placeholder="Повторите пароль" onChange={e => setForm({ ...form, repeatPassword: e.target.value })} />

      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      <button>Создать аккаунт</button>
    </form>
  );
};
