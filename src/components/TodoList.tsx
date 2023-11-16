import React from "react";
import "../App.css";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { Todo, FilterStatus } from "../../types/todoType";
import DeleteTodo from "./DeleteTodo";
import ChangeTodoStatus from "./ChangeTodoStatus";
import EditTodo from "./EditTodo";
import FilterStatusControls from "./FilterStatusControls";

interface TodoListProps {
  visibleTodos: Todo[];
  isSorted: boolean;
  filterStatus: FilterStatus;
  handleTodoStatusChange: (id: string, newStatus: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (
    id: Todo['id'],
    title: Todo['title'],
    detail: Todo['detail'],
    deadline: Todo['deadline']
  ) => void;
  handleTodoSortButtonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  visibleTodos,
  isSorted,
  filterStatus,
  handleTodoStatusChange,
  handleDeleteTodo,
  handleEditTodo,
  handleTodoSortButtonChange,
  handleFilterStatusChange,
}) => {
  return (
    <>
      {/* 締切の昇順で並べ替えるチェックボックス */}
      <label className="todoSort">
        <span>締切が近い順に並べ替える</span>
        <input 
          type="checkbox"
          checked={isSorted}
          onChange={handleTodoSortButtonChange}
        />
      </label>

      <FilterStatusControls
        filterStatus={filterStatus}
        handleFilterStatusChange={handleFilterStatusChange}
      />

      <div className="todoListArea">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Task</Th>
                <Th>Status</Th>
                <Th>Detail</Th>
                <Th>Deadline</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {visibleTodos.map((visibleTodo) => (
                <Tr key={visibleTodo.id} className={`tr-${visibleTodo.status}`}>
                  <Td>{visibleTodo.title}</Td>
                  <Td className="todoItemStatus">
                    <ChangeTodoStatus
                      visibleTodo={visibleTodo}
                      handleTodoStatusChange={handleTodoStatusChange}
                    />
                  </Td>
                  <Td>{visibleTodo.detail}</Td>
                  <Td>{visibleTodo.deadline}</Td>
                  <Td>
                    <EditTodo
                      editTodo={visibleTodo}
                      handleEditTodo={handleEditTodo}
                    />
                  </Td>
                  <Td>
                    <DeleteTodo
                      deleteId={visibleTodo.id}
                      handleDeleteTodo={handleDeleteTodo}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TodoList;
