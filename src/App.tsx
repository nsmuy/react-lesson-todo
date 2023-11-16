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
    deadline: '2024-09-21'
  },
  {
    id: uuidv4(),
    title: 'タスクD',
    status: 'untouched',
    detail: 'DDDDDDD',
    deadline: '2024-06-01'
  },
  {
    id: uuidv4(),
    title: 'タスクE',
    status: 'processing',
    detail: 'EEEEEEE',
    deadline: '2024-01-01'
  },
]

function App() {
  const [inputTodo, setInputTodo] = useState<string>('');
  const [inputDetail, setInputDetail] = useState<string>('');
  const [inputDeadline, setInputDeadline] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(dummy);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>({
    all: true,
    untouched: false,
    processing: false,
    completed: false
  });

  const handleTodoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value);
  }

  const handleTodoDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDetail(e.target.value);
  }

  const handleTodoDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDeadline(e.target.value);
  }

  // Todosが変化（追加・削除）した時
  // ステータスとソートの値に応じて、visibleTodosを更新する
  useEffect(() => {
    const updateVisibleTodos = () => {
      let newTodos = [...todos];

      if (!filterStatus.all) {
        newTodos = newTodos.filter(todo => filterStatus[todo.status] ?? false);
      }

      if (isSorted) {
        newTodos = handleTodoSortASC(newTodos);
      }

      return newTodos;
    };

    setVisibleTodos(updateVisibleTodos());
  }, [todos]);

  //Todoを追加する関数
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
      return [...prevTodos, newTodo];
    });
    setInputTodo('');
    setInputDetail('');
    setInputDeadline('');
  }

  // Todoを削除する関数
  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  // Todoの内容を変更する関数
  const handleEditTodo = (id: Todo['id'], title: Todo['title'], detail: Todo['detail'], deadline: Todo['deadline']) => {
    const newTodos: Todo[] = todos.map(todo => 
      todo.id === id ? {...todo, title: title, detail: detail, deadline: deadline } :
      todo
    );
    setTodos(newTodos);
  }

  //Todoのステータスを変更する関数
  const handleTodoStatusChange = (id: string, newStatus: string) => {
    const newTodos: Todo[] = todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus as Todo['status'] } : todo
    );
    setTodos(newTodos);
  };

  // 昇順ソートボタンがクリックされたとき、呼び出される関数
  const handleTodoSortButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsSorted(isChecked);

    const newVisibleTodos = [...visibleTodos];
    if (isChecked) {
      setVisibleTodos(handleTodoSortASC(newVisibleTodos));
    } else {
      handleFilterStatus(filterStatus);
    }
  }

  // deadlineの値を昇順にソートする関数
  const handleTodoSortASC = (todos: Todo[]) => {
    const sortedTodos = todos.sort((a: Todo, b: Todo) => {
      if (a.deadline === null) return 1;
      if (b.deadline === null) return -1;
      return a.deadline.localeCompare(b.deadline);
    });
    return sortedTodos;
  }

  //filterStatusが変更されたらhandleFilterStatusを実行
  useEffect(() => {
    handleFilterStatus(filterStatus);
  }, [filterStatus]);

  //ボタンの操作からfilterStatusを変更する関数
  const handleFilterStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
  
    setFilterStatus(prevStatus => {
      const newStatus = { ...prevStatus, [name]: checked };
  
      if (name === 'all') {
        if (checked) {
          // allがtrueのとき、他のすべてをfalseに設定
          newStatus.untouched = false;
          newStatus.processing = false;
          newStatus.completed = false;
        }
      } else {
        // all以外のステータスが更新されたとき
        newStatus.all = false;
        // all以外のすべてがfalseのとき、allをtrueにする
        if(!newStatus.untouched && !newStatus.processing && !newStatus.completed) {
          newStatus.all = true;
        }
      }

      return newStatus;
    });
  };

  //変更されたステータスに応じて絞り込み、visibleTodosを更新する関数
  const handleFilterStatus = (filterStatus: FilterStatus) => {
    const newTodos = [...todos];

      if (filterStatus.all) {
        setVisibleTodos(newTodos);
      } else {
        setVisibleTodos(newTodos.filter(todo => filterStatus[todo.status] ?? false));
      }
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
        visibleTodos={visibleTodos}
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
