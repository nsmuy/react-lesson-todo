import React from "react";
import "../App.css";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { Todo } from "../../types/todoType";
import DeleteTodo from "./DeleteTodo";
import ChangeTodoStatus from "./ChangeTodoStatus";

interface TodoListProps {
  todos: Todo[];
  handleDeleteTodo: (id: string) => void;
  handleTodoStatusChange: (id: string, newStatus: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleDeleteTodo,
  handleTodoStatusChange,
}) => {
  return (
    <>
      <div className="todoListArea">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Task</Th>
                <Th>Status</Th>
                <Th>Detail</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {todos.map((todo) => (
                <Tr key={todo.id}>
                  <Td>{todo.title}</Td>
                  <Td>
                    <ChangeTodoStatus
                      todo={todo}
                      handleTodoStatusChange={handleTodoStatusChange}
                    />
                  </Td>
                  <Td>{todo.detail}</Td>
                  <Td>
                    <DeleteTodo
                      deleteId={todo.id}
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
