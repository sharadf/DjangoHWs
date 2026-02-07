import React, { useState } from 'react';
import { Todo } from '../../types/todo.types';
import { TodoItem } from './TodoItem';

interface TodoDragListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export const TodoDragList: React.FC<TodoDragListProps> = ({
  todos,
  onToggle,
  onDelete,
  onReorder,
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = todos.findIndex(todo => todo.id === draggedItem);
    const targetIndex = todos.findIndex(todo => todo.id === targetId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      onReorder(draggedIndex, targetIndex);
    }
    
    setDraggedItem(null);
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Нет задач
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          draggable
          onDragStart={(e) => handleDragStart(e, todo.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, todo.id)}
          className={`transition-opacity duration-200 ${
            draggedItem === todo.id ? 'opacity-50' : ''
          }`}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};