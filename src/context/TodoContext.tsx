import { createContext, useContext, useState, ReactNode } from "react";
import { Todo } from "../types/todo.types";
import { TodoContextType, FilterType } from "./todo.types";
import { reorderList } from "../utils/dragAndDrop.ts";

const TodoContext = createContext<TodoContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const changeFilter = (value: FilterType) => {
    setFilter(value);
  };

  const reorderTodos = (startIndex: number, endIndex: number) => {
    setTodos((prev) => reorderList(prev, startIndex, endIndex));
  };

  const value: TodoContextType = {
    todos,
    filter,
    addTodo,
    deleteTodo,
    toggleTodo,
    changeFilter,
    reorderTodos,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

// Хук для удобства
export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used inside TodoProvider");
  }

  return context;
};
