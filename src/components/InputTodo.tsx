import React from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'

type InputTodoProps = {
  inputTodo: string;
  inputDetail: string;
  inputDeadline: string;
  handleTodoTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTodoDetailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTodoDeadlineChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const InputTodo: React.FC<InputTodoProps> = ({
  inputTodo,
  inputDetail,
  inputDeadline,
  handleTodoTitleChange,
  handleTodoDetailChange,
  handleTodoDeadlineChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        TASK
        <input
          type="text"
          value={inputTodo}
          onChange={handleTodoTitleChange}
          required
        />
      </label>

      <label>
        MEMO
        <input
          type="text"
          value={inputDetail}
          onChange={handleTodoDetailChange}
        />
      </label>

      <label>
        Deadline
        <input
          type="date"
          value={inputDeadline}
          onChange={handleTodoDeadlineChange}
        />
      </label>
      <Button colorScheme='orange' type="submit">Add</Button>
    </form>
  );
};


export default InputTodo;
