import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import  TodoForm from '../components/todo/TodoForm';
import  TodoList  from '../components/todo/TodoList';
import  TodoFilter  from '../components/todo/TodoFilter';
import { ThemeToggle } from '../components/ui/ThemeToggle';

const TodoPage = () => {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app">
      {/* Header */}
      <div className="todo-header">
        <div>
          <h1>Todo List</h1>
          <span className="subtitle">Привет, {user.name}</span>
        </div>

        <ThemeToggle />
      </div>

      {/* Controls */}
      <TodoForm />
      <TodoFilter />

      {/* List */}
      <TodoList />

      {/* Footer */}
      <button className="logout" onClick={logout}>
        Выйти
      </button>
    </div>
  );
};

export default TodoPage;
