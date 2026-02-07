import React, { createContext, useEffect, useState } from 'react';
import { AuthContextType, LoginData, RegisterData, User } from '../types/auth.types';

export const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'todo_users';
const CURRENT_USER_KEY = 'todo_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = (data: RegisterData) => {
    const { name, email, password, repeatPassword } = data;

    if (!name || !email || !password) {
      throw new Error('Все поля обязательны');
    }

    if (password !== repeatPassword) {
      throw new Error('Пароли не совпадают');
    }

    const users: any[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    if (users.some(u => u.email === email)) {
      throw new Error('Пользователь уже существует');
    }

    users.push({ id: crypto.randomUUID(), name, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = (data: LoginData) => {
    const users: any[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    const found = users.find(
      u => u.email === data.email && u.password === data.password
    );

    if (!found) {
      throw new Error('Неверный email или пароль');
    }

    const loggedUser: User = {
      id: found.id,
      name: found.name,
      email: found.email,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
