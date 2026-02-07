import { useTodos } from "../../hooks/useTodos";
import { FilterType } from "../../context/todo.types";

const TodoFilter = () => {
  const { filter, changeFilter } = useTodos();

  const filters: FilterType[] = ["all", "active", "completed"];

  return (
<div className="filter">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => changeFilter(f)}
          style={{
            fontWeight: filter === f ? "bold" : "normal",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
