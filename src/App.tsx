import React, { useState, useRef } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../types/todoType'
import TodoList from "./components/TodoList";
import InputTodo from "./components/InputTodo";

const dummy: Todo[]= [
  {
    id: uuidv4(),
    title: 'タスクA',
    status: "untouched",
    detail: 'AAAAAAA',
    deadline: '2023-12-01'
  },
  {
    id: uuidv4(),
    title: 'タスクB',
    status: 'processing',
    detail: 'BBBBBBBBB',
    deadline: '2024-01-03'
  },
  {
    id: uuidv4(),
    title: 'タスクC',
    status: 'completed',
    detail: 'CCCCCCC',
    deadline: '2023-12-01'
  },

]


function App() {
  const [inputTodo, setInputTodo] = useState<string>('');
  const [inputDetail, setInputDetail] = useState<string>('');
  const [inputDeadline, setInputDeadline] = useState<string>('');
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>(dummy);

  const handleTodoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value);
  }

  const handleTodoDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDetail(e.target.value);
  }

  const handleTodoDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDeadline(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: uuidv4(),
      title: inputTodo,
      status: "untouched",
      detail: inputDetail,
      deadline: inputDeadline,
    }

    setTodos((prevTodos) => {
      return [...prevTodos, newTodo]
    });

    setInputTodo('');
    setInputDetail('');
    setInputDeadline('');
  }

  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const handleEditTodo = (id: Todo['id'], title: Todo['title'], detail: Todo['detail'], deadline: Todo['deadline']) => {
    const newTodos: Todo[] = todos.map(todo => 
      todo.id === id ? {...todo, title: title, detail: detail, deadline: deadline } :
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
        inputDeadline={inputDeadline}
        handleTodoTitleChange={handleTodoTitleChange}
        handleTodoDetailChange={handleTodoDetailChange}
        handleTodoDeadlineChange={handleTodoDeadlineChange}
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
