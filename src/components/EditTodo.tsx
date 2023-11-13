import React, { useState } from "react";
import { Todo } from "../../types/todoType";

import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from "@chakra-ui/react";

type EditTodoProps = {
  editTodo: Todo;
  handleEditTodo: (id: Todo['id'], title: Todo['title'], detail: Todo['detail']) => void;
};

const EditTodo: React.FC<EditTodoProps> = ({ editTodo, handleEditTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>(editTodo.title);
  const [detail, setDetail] = useState<string | null>(editTodo.detail);

  return (
    <div>
      {/* モーダル */}
      <Button colorScheme="gray" onClick={onOpen}>
        Edit
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <label>
              Todo Title
              <Input value={title} onChange={(e) => setTitle(e.target.value)}
            />
            </label>
            <label>
              Todo Detail
              <Input value={detail || ""} onChange={(e) => setDetail(e.target.value)} />
            </label>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleEditTodo(editTodo.id, title, detail);
                onClose();
              }}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditTodo;
