import React, { useState, useRef } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Todo } from './TodoDescription'
import TodoList from "./components/TodoList";


function App() {
  const [inputTodo, setInputTodo] = useState('');
  const [inputDetail, setInputDetail] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value);
    console.log(inputTodo);
  }

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDetail(e.target.value);
    console.log(inputDetail);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: uuidv4(),
      name: inputTodo,
      status: "untouched",
      detail: inputDetail
    }

    setTodos((prevTodos) => {
      return [...prevTodos, newTodo]
    });

    setInputTodo('');
    setInputDetail('');
  }

  return (
    <div className="app">
      <h1 className="appTitle">My Task</h1>

    <div className="inputTodoArea">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          TASK
          <input
            type="text"
            value={inputTodo}
            onChange={(e) => handleTodoChange(e)}
          />
        </label>

        <label>
          MEMO
          <input
            type="text"
            value={inputDetail}
            onChange={(e) => handleDetailChange(e)}
          />
        </label>
        <Button colorScheme='orange' type="submit">Add</Button>
      </form>
    </div>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
