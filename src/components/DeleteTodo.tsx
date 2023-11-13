import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'


type DeleteTodoProps = {
  deleteId: string;
  handleDeleteTodo: (id: string) => void;
};

const DeleteTodo: React.FC<DeleteTodoProps> = ({deleteId, handleDeleteTodo}) => {
  return (
    <Button
      colorScheme='gray'
      type="submit"
      onClick={() => handleDeleteTodo(deleteId)}
    >
      Delete
    </Button>
  )
}

export default DeleteTodo