import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Flex,
  Text,
  useToast,
  Box,
  IconButton,
  FormErrorMessage
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

import { formatDateToYYYYMMDD } from '../../../../utils/formatters/date';

const BorrowSlipModal = ({ 
  isOpen, 
  onClose, 
  mode, // add or edit
  initialData, // for editing
  onSubmit // to handle submitting
}) => {
  const now = new Date().toISOString().split("T")[0];
  const toast = useToast();
  const [formData, setFormData] = useState({
    _id: '',
    borrowed_date: '', 
    return_date: '', 
    status: '',
    user_id: '', 
    manager_id: '',
    books: [] // Add a field for borrowed books
  });

  const [dateError, setDateError] = useState(''); // State for date error

  // Reset form data
  useEffect(() => {
    if (isOpen && mode === 'edit' && initialData) {
      setFormData({
        _id: initialData._id || '',
        borrowed_date: formatDateToYYYYMMDD(initialData.borrowed_date) || now,
        return_date: formatDateToYYYYMMDD(initialData.return_date) || now,
        status: initialData.status || '',
        user_id: initialData.user_id || '',
        manager_id: initialData.manager_id || '',
        books: initialData.books || [], // Initialize borrowed books
      });
    } else if (isOpen && mode === 'add') {
      setFormData({
        _id: '',
        borrowed_date: now,
        return_date: '',
        status: 'borrowed',
        user_id: '',
        manager_id: '',
        books: [], // Initialize as empty for new entries
      });
    }
  }, [isOpen, mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status" && value === "returned") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        return_date: now, 
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Validate that return_date is later than borrowed_date
    if (name === 'return_date') {
      const borrowedDate = new Date(formData.borrowed_date);
      const returnDate = new Date(value);

      if (returnDate < borrowedDate) {
        setDateError('Ngày trả phải lớn hơn ngày mượn');
      } else {
        setDateError('');
      }
    }
  };

  // Handle adding a new book
  const handleAddBook = () => {
    setFormData((prevData) => ({
      ...prevData,
      books: [...prevData.books, '']
    }));
  };

  // Handle change for each book (work with string directly)
  const handleBookChange = (index, e) => {
    const { value } = e.target;
    const updatedBooks = formData.books.map((book, i) => (i === index ? value : book));
    setFormData((prevData) => ({
      ...prevData,
      books: updatedBooks,
    }));
  };

  // Handle removing a book
  const handleRemoveBook = (index) => {
    const updatedBooks = formData.books.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      books: updatedBooks,
    }));
  };

  const handleSubmit =   (e) => {
    e.preventDefault();
    if (dateError){
      return
    }
    else {
      onSubmit(formData);
      const title = mode === 'add' ? 'Thêm thành công' : 'Cập nhật thành công';
      toast({
        title: title,
        position: "bottom-right",
        isClosable: true,
        status: "success"
      });
      onClose(); // Close modal
    }
    
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}
      isCentered
      motionPreset='slideInBottom'
      size='xl'
      scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode === 'edit' ? 'Chỉnh sửa phiếu mượn' : 'Thêm phiếu mượn'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {mode === 'edit' ? (
              <FormControl mb="4">
                <FormLabel>Mã phiếu mượn</FormLabel>
                <Input
                  name="_id"
                  value={formData._id}
                  onChange={handleChange}
                  readOnly 
                />
              </FormControl>
            ) : null}
            {/* Borrower */}
            <FormControl mb="4" isRequired>
              <FormLabel>Thông tin người mượn</FormLabel>
              <Flex gap="4"> 
                <Input
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  placeholder="Mã người mượn"
                  flex="1" 
                />
              </Flex>
            </FormControl>
            {/* Borrowed Date */}
            <FormControl mb="4" isRequired>
              <FormLabel>Ngày mượn</FormLabel>
              <Input
                type="date"
                name="borrowed_date"
                value={formData.borrowed_date}
                onChange={handleChange}
              />
            </FormControl>
            {/* Return Date */}
            <FormControl mb="4" isRequired isInvalid={!!dateError}>
              <FormLabel>Ngày trả</FormLabel>
              <Input
                type="date"
                name="return_date"
                value={formData.return_date}
                onChange={handleChange}
              />
              {dateError && <FormErrorMessage>{dateError}</FormErrorMessage>}
            </FormControl>
            {/* Status */}
            <FormControl mb="4" isRequired>
              <FormLabel>Tình trạng</FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="registered">Đã đăng ký</option>
                <option value="borrowed">Đang mượn</option>
                <option value="returned">Đã trả</option>  
              </Select>
            </FormControl>
            {/* Manager */}
            <FormControl mb="4">
              <FormLabel>Người cho mượn</FormLabel>
              <Input
                name="manager_id"
                value={formData.manager_id}
                onChange={handleChange}
              />
            </FormControl>
            
            {/* Borrowed Books Section */}
            <FormControl mb="4">
              <FormLabel>Danh sách mượn</FormLabel>
              
              {formData.books.map((book, index) => (
                <Box key={index} borderWidth="1px" borderRadius="lg" p="4" mb="2">
                  <Flex mb="2">
                    <FormControl flex="1" mr="2" isRequired>
                      <FormLabel htmlFor={`book-title-${index}`}>Mã sách</FormLabel>
                      <Flex>
                      <Input
                        id={`book-${index}`}
                        value={book}
                        onChange={(e) => handleBookChange(index, e)}
                        placeholder="Nhập mã sách"
                      />
                      <IconButton ml="2"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleRemoveBook(index)}
                        aria-label="Xóa sách"
                  />
                  </Flex>
                    </FormControl>
                    {/* <FormControl flex="1" mr="2">
                      <FormLabel htmlFor={`book-author-${index}`}>Tên sách</FormLabel>
                      <Input
                        id={`book-author-${index}`}
                        name="author"
                        value={book.author}
                        onChange={(e) => handleBookChange(index, e)}
                        placeholder="Nhập tác giả sách"
                      />
                    </FormControl>
                    <FormControl flex="1">
                      <FormLabel htmlFor={`book-isbn-${index}`}>ISBN</FormLabel>
                      <Input
                        id={`book-isbn-${index}`}
                        name="isbn"
                        value={book.isbn}
                        onChange={(e) => handleBookChange(index, e)}
                        placeholder="Nhập ISBN sách"
                      />
                    </FormControl> */}
                    
                  </Flex>
                  
                </Box>
              ))}
              <Button onClick={handleAddBook} colorScheme="teal" leftIcon={<AddIcon />} mb="2">
                Thêm sách
              </Button>
            </FormControl>

            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                {mode === 'edit' ? 'Lưu' : 'Thêm'}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Hủy
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BorrowSlipModal;
