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
} from "@chakra-ui/react";

import { formatDateToYYYYMMDD } from '../../../../utils/formatters/date'

const BorrowSlipModal = ({ 
  isOpen, 
  onClose, 
  mode, // add or edit
  initialData, // for editing
  onSubmit // to handle submiting
}) => {
  const now = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    _id: '',
    borrowed_date: '', 
    return_date: '', 
    status: '',
    user_id: '', 
    manager_id: '',
  });

  // reset form data
  useEffect(() => {
    if (isOpen && mode === 'edit' && initialData) {
      setFormData({
        _id: initialData._id || '',
        borrowed_date: formatDateToYYYYMMDD(initialData.borrowed_date) || now,
        return_date: formatDateToYYYYMMDD(initialData.return_date) || now,
        status: initialData.status || '',
        user_id: initialData.user_id || '',
        manager_id: initialData.manager_id || '',
      });
    } else if (isOpen && mode === 'add') {
      setFormData({
        _id: '',
        borrowed_date: now,
        return_date: '',
        status: 'borrowed',
        user_id: '',
        manager_id: '',
        
      });
    }
  }, [isOpen, mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting update for ID:", formData._id);
    onSubmit(formData);
    onClose(); // close modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}
    isCentered
    motionPreset='slideInBottom'
    size='lg'
    scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode === 'edit' ? 'Chỉnh sửa phiếu mượn' : 'Thêm phiếu mượn'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
          {mode === 'edit' ? (
          <FormControl mb="4" >
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
                {/* <Input
                  name="user_fullName"
                  value={formData.user_fullName} 
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  flex="1" 
                /> */}
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
            <FormControl mb="4" isRequired>
              <FormLabel>Ngày trả</FormLabel>
              <Input
                type="date"
                name="return_date"
                value={formData.return_date}
                onChange={handleChange}
              />
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
