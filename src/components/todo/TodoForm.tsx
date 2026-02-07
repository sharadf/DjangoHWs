import { FormEvent, useState } from "react";
import { useTodos } from "../../hooks/useTodos";


const TodoForm = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodo(title.trim());
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
