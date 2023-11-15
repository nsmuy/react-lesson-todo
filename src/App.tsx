import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { Todo, FilterStatus } from '../types/todoType'
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
  const [todos, setTodos] = useState<Todo[]>(dummy);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [unsortedTodos, setUnsortedTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>({
    all: true,
    untouched: false,
    processing: false,
    completed: false
  })

  // 最初にTodoを入力するときの関数
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

  // Todo入力後にTodoを削除する関数
  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  // Todo入力後に内容を変更する関数
  const handleEditTodo = (id: Todo['id'], title: Todo['title'], detail: Todo['detail'], deadline: Todo['deadline']) => {
    const newTodos: Todo[] = todos.map(todo => 
      todo.id === id ? {...todo, title: title, detail: detail, deadline: deadline } :
      todo
    );
    setTodos(newTodos);
  }

  //Todoの進行状況（ステート）を変更する関数
  const handleTodoStatusChange = (id: string, newStatus: string) => {
    const newTodos: Todo[] = todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus as Todo['status'] } : todo
    );
    setTodos(newTodos);
  };

  // Todoリストが昇順にソートされているか監視する関数
  const handleTodoSortButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsSorted(isChecked);

    if (isChecked) {
      const prevTodos = [...todos]; //ソート前のTodosを格納
      setUnsortedTodos(prevTodos);
      handleTodoSortASC(todos);
    } else {
      const prevTodos = [...unsortedTodos];
      setTodos(prevTodos);
    }
  }

  // Todoの締切を昇順ソートする関数
  const handleTodoSortASC = (todos: Todo[]) => {
    const sortedTodos = todos.sort((a: Todo, b: Todo) => {
      if (a.deadline === null) return 1;
      if (b.deadline === null) return -1;
      return a.deadline.localeCompare(b.deadline);
    });
    setTodos(sortedTodos);
  }

  useEffect(() => {
    handleFilterStatus(todos, filterStatus);
  }, [filterStatus]);

  //進行状態による絞り込み
  const handleFilterStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;

    setFilterStatus(prevStatus => {
      const newStatus = { ...prevStatus };

      switch (name) {
        case 'all':
          if (checked) {
            newStatus.untouched = false;
            newStatus.processing = false;
            newStatus.completed = false;
            newStatus.all = checked;
          }
          break;
        case 'untouched':
        case 'processing':
        case 'completed':
          if (checked) {
            newStatus[name] = checked;
          }
          newStatus.all = false;
          break;
        default:
          break;
      }
      return newStatus;
    });
  }

  const handleFilterStatus = (todos: Todo[], filterStatus: FilterStatus) => {
    setTodos(prevTodos => {
      if (filterStatus.all) {
        return prevTodos;
      } 
      return prevTodos.filter(todo => {
        return (filterStatus[todo.status] ?? false);
      });
    });
  }

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
        isSorted={isSorted}
        filterStatus={filterStatus}
        handleTodoStatusChange={handleTodoStatusChange}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
        handleTodoSortButtonChange={handleTodoSortButtonChange}
        handleFilterStatusChange={handleFilterStatusChange}
      />
    </div>
  );
}

export default App;
