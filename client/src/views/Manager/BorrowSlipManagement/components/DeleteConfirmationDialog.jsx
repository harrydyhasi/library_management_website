import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  title = "Xóa phiếu mượn này", 
  message = "Bạn có chắc muốn xóa phiếu mượn này?", 
  onConfirm, 
  confirmText = "Xóa", 
  cancelText = "Hủy" 
}) => {
  const cancelRef = useRef();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      motionPreset='slideInBottom'
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>
            {message}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText}
            </Button>
            <Button colorScheme="red" onClick={() => { onConfirm(); onClose(); }} ml={3}>
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
