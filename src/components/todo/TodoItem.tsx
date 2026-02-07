import { Todo } from "../../types/todo.types";
import { useTodos } from "../../hooks/useTodos";

type Props = {
  todo: Todo;
  index: number;
  onDragStart: (index: number) => void;
  onDrop: (index: number) => void;
};

const TodoItem = ({ todo, index, onDragStart, onDrop }: Props) => {
  const { deleteTodo, toggleTodo } = useTodos();

  return (
    <li
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(index)}
      style={{
        cursor: "grab",
        opacity: todo.completed ? 0.6 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          margin: "0 8px",
        }}
      >
        {todo.title}
      </span>

      <button onClick={() => deleteTodo(todo.id)}>✕</button>
    </li>
  );
};

export default TodoItem;
