import React from 'react'
import { Todo } from "../../types/todoType";

type ChangeTodoStatusProps = {
  todo: Todo;
  handleTodoStatusChange: (id:string, newStatus: string) => void;
}

const ChangeTodoStatus: React.FC<ChangeTodoStatusProps> = ({todo, handleTodoStatusChange}) => {
  return (
    <div>
      <select value={todo.status} onChange={(e) => handleTodoStatusChange(todo.id, e.target.value)}>
        <option value="untouched">Untouched</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  )
}

export default ChangeTodoStatus