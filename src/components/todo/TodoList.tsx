import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos, filter, reorderTodos } = useTodos();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;
    reorderTodos(draggedIndex, index);
    setDraggedIndex(null);
  };

  if (filteredTodos.length === 0) {
    return <p>No tasks</p>;
  }

  return (
    <ul>
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </ul>
  );
};

export default TodoList;
