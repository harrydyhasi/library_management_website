import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

const AddCategoryDialog = ({ isOpen, onClose, onAdd }) => {
  const [categoryName, setCategoryName] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');

  const handleAdd = () => {
    onAdd({ id: categoryId, name: categoryName });
    setCategoryId(''); 
    setCategoryName('');
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Thêm danh mục mới</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Mã danh mục</FormLabel>
            <Input
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              placeholder="Nhập mã danh mục"
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Tên danh mục</FormLabel>
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Nhập tên danh mục"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Hủy
          </Button>
          <Button colorScheme="teal" onClick={handleAdd}>
            Thêm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryDialog;
