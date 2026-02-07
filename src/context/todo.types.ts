import { Todo } from "../types/todo.types";

export type FilterType = "all" | "completed" | "active";

export interface TodoContextType {
  todos: Todo[];
  filter: FilterType;

  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  changeFilter: (filter: FilterType) => void;
  reorderTodos: (startIndex: number, endIndex: number) => void;
}
