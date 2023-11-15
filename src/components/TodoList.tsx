import React from "react";
import "../App.css";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { Todo } from "../../types/todoType";
import DeleteTodo from "./DeleteTodo";
import ChangeTodoStatus from "./ChangeTodoStatus";
import EditTodo from "./EditTodo";


interface TodoListProps {
  todos: Todo[];
  handleTodoStatusChange: (id: string, newStatus: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: Todo['id'], title: Todo['title'], detail: Todo['detail'], deadline: Todo['deadline']) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleTodoStatusChange,
  handleDeleteTodo,
  handleEditTodo,
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
                <Th>Deadline</Th>
                <Th></Th>
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
                  <Td>{todo.deadline}</Td>
                  <Td>
                    <EditTodo
                      editTodo={todo}
                      handleEditTodo={handleEditTodo}
                    />
                  </Td>
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
