import React from "react";
import { Todo } from "../../types/todoType";

type ChangeTodoStatusProps = {
  visibleTodo: Todo;
  handleTodoStatusChange: (id: string, newStatus: string) => void;
};

const ChangeTodoStatus: React.FC<ChangeTodoStatusProps> = ({ visibleTodo, handleTodoStatusChange }) => {
  return (
    <div>
      <select value={visibleTodo.status} onChange={(e) => handleTodoStatusChange(visibleTodo.id, e.target.value)}>
        <option value="untouched">Untouched</option>
        <option value="processing">processing</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default ChangeTodoStatus;
