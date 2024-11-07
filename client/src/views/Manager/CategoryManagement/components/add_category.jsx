import React, { useEffect } from 'react';
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
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategory } from '../../../../redux/actions/category_action';
import CustomToast from '../../../../components/Toast/CustomToast';

const AddCategoryDialog = ({ isOpen, onClose, currentCategory }) => {
  const dispatch = useDispatch(); 
  const categories = useSelector((state) => state.category.categories);
  const [categoryName, setCategoryName] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [error, setError] = React.useState('');
  const { showToast } = CustomToast();

  useEffect(() => {
    if (currentCategory) {
      setCategoryId(currentCategory.id);
      setCategoryName(currentCategory.name);
      setError(''); 
    } else {
      setCategoryId('');
      setCategoryName('');
      setError(''); 
    }
  }, [currentCategory, isOpen]); 

  const handleAddCategory = () => {
    try {
      dispatch(createCategory({ id: categoryId, name: categoryName }));
      showToast({ title: "Thêm danh mục thành công!", status: "success" });
    } catch (err) {
      showToast({ title: "Thêm danh mục thất bại!", status: "error" });
    }
  };
  const handleUpdateCategory = () => {
    try {
      dispatch(updateCategory(currentCategory.id, { name: categoryName, id: categoryId }));
      showToast({ title: "Cập nhật danh mục thành công!", status: "success" });
    } catch (error) {
      showToast({ title: "Cập nhật danh mục thất bại!", status: "error" });
    }
  };

  const handleSubmit = () => {
    if (!categoryId || !categoryName) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
  
    const isIdExist = categories.some(category => category.id === categoryId && (!currentCategory || category.id !== currentCategory.id));
  
    const isNameExist = categories.some(category => 
      category.name.toLowerCase() === categoryName.toLowerCase() && (!currentCategory || category.id !== currentCategory.id)
    );
  
    if (isIdExist) {
      setError('Mã danh mục đã tồn tại.');
      return;
    }
  
    if (isNameExist) {
      setError('Tên danh mục đã tồn tại.');
      return;
    }
  
    if (currentCategory) {
      handleUpdateCategory();
    } else {
      handleAddCategory();
    }
  
    setCategoryId(''); 
    setCategoryName('');
    setError(''); 
    onClose(); 
  };
  
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{currentCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl>
          <FormLabel>Mã danh mục</FormLabel>
          <Input
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value.toUpperCase())}
            placeholder="Nhập mã danh mục"
            textTransform="uppercase"
          />
        </FormControl>
          <FormControl mt={4}>
            <FormLabel>Tên danh mục</FormLabel>
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Nhập tên danh mục"
            />
          </FormControl>
          {error && <Text color="red.500" mt={2}>{error}</Text>} 
        </ModalBody>
        <ModalFooter>
          <Button 
            colorScheme='teal.500'
            borderColor='teal.500'
            color='teal.500'
            variant='outline'
            p='8px 20px'
            mr='32px' onClick={onClose}>
            Hủy
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            {currentCategory ? 'Cập nhật' : 'Thêm'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryDialog;
