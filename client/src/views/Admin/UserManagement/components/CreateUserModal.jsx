import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const CreateUserModal = ({ isOpen, onClose, handleCreateUser, newUserData, setNewUserData, formErrors, setFormErrors }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    return /^\d*$/.test(phone); 
  };

  const validateForm = () => {
    const errors = {};
    if (!newUserData.fullName) {
      errors.fullName = "Họ và tên là bắt buộc!";
    }
    if (!newUserData.email) {
      errors.email = "Email không được để trống!";
    } else if (!validateEmail(newUserData.email)) {
      errors.email = "Email không hợp lệ!";
    }
    if (!newUserData.password) {
      errors.password = "Mật khẩu không được để trống!";
    }
    if (newUserData.password !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu không trùng khớp!";
    }
    if (!newUserData.role) {
      errors.role = "Chọn phân quyền cho người dùng!";
    }
    if (newUserData.phone && !validatePhoneNumber(newUserData.phone)) {
      errors.phone = "Số điện thoại chỉ được phép là số!";
    }
    return errors;
  };

  const handleCreateUserWithValidation = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    setFormErrors({});
    handleCreateUser(newUserData, onClose, setNewUserData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tạo người dùng mới</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4" isInvalid={!!formErrors.fullName}>
            <FormLabel>Họ và tên <span style={{ color: 'red' }}>*</span></FormLabel>
            <Input
              name="fullName"
              value={newUserData.fullName}
              onChange={(e) => setNewUserData({ ...newUserData, fullName: e.target.value })}
              placeholder="Nhập họ và tên"
            />
            <FormErrorMessage>{formErrors.fullName}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={!!formErrors.email}>
            <FormLabel>Email <span style={{ color: 'red' }}>*</span></FormLabel>
            <Input
              name="email"
              type="email"
              autoComplete="off"
              value={newUserData.email}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              placeholder="Nhập email"
            />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={!!formErrors.phone}>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              name="phone"
              autoComplete="off"
              value={newUserData.phone}
              onChange={(e) => {
                const value = e.target.value;
                if (validatePhoneNumber(value)) {
                  setNewUserData({ ...newUserData, phone: value });
                }
              }}
              placeholder="Nhập số điện thoại"
            />
            <FormErrorMessage>{formErrors.phone}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={!!formErrors.password}>
            <FormLabel>Mật khẩu <span style={{ color: 'red' }}>*</span></FormLabel>
            <InputGroup>
              <Input
                name="password"
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                value={newUserData.password}
                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                placeholder="Nhập mật khẩu"
              />
              <InputRightElement>
                <IconButton
                  variant="link"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={!!formErrors.confirmPassword}>
            <FormLabel>Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span></FormLabel>
            <InputGroup>
              <Input
                name="confirmPassword"
                autoComplete="new-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
              />
              <InputRightElement>
                <IconButton
                  variant="link"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={!!formErrors.role}>
            <FormLabel>Phân quyền <span style={{ color: 'red' }}>*</span></FormLabel>
            <Select
              name="role"
              value={newUserData.role}
              onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
            >
              <option value="">Chọn phân quyền</option>
              <option value="admin">Admin</option>
              <option value="student">Sinh viên</option>
              <option value="manager">Quản lý thư viện</option>
            </Select>
            <FormErrorMessage>{formErrors.role}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleCreateUserWithValidation}>
            Tạo người dùng
          </Button>
          <Button onClick={onClose} ml={3}>
            Hủy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
