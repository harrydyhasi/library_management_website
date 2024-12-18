// src/components/Dialogs/ConfirmDialog.jsx
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message = "" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Xác nhận</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='red.400'
            borderColor='red.400'
            color='red.400'
            variant='outline'
            p='8px 20px'
            mr='32px' onClick={onClose}>
            Hủy
          </Button>
          <Button colorScheme="red" onClick={() => { onConfirm(); onClose(); }}>
            Xác nhận
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
