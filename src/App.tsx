import React, { useState, useRef } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../types/todoType'
import TodoList from "./components/TodoList";
import InputTodo from "./components/InputTodo";


function App() {
  const [inputTodo, setInputTodo] = useState<string>('');
  const [inputDetail, setInputDetail] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleTodoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value);
  }

  const handleTodoDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDetail(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: uuidv4(),
      title: inputTodo,
      status: "untouched",
      detail: inputDetail
    }

    setTodos((prevTodos) => {
      return [...prevTodos, newTodo]
    });

    setInputTodo('');
    setInputDetail('');
  }

  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const handleEditTodo = (id: Todo['id'], title: Todo['title'], detail: Todo['detail']) => {
    const newTodos: Todo[] = todos.map(todo => 
      todo.id === id ? {...todo, title: title, detail: detail } :
      todo
    );
    setTodos(newTodos);
  }

  const handleTodoStatusChange = (id: string, newStatus: string) => {
    const newTodos: Todo[] = todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus as Todo['status'] } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1 className="appTitle">My Task</h1>

      <InputTodo
        inputTodo={inputTodo}
        inputDetail={inputDetail}
        handleTodoTitleChange={handleTodoTitleChange}
        handleTodoDetailChange={handleTodoDetailChange}
        handleSubmit={handleSubmit}
      />

      <TodoList
        todos={todos}
        handleTodoStatusChange={handleTodoStatusChange}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </div>
  );
}

export default App;
