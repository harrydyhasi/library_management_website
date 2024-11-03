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
  Switch,
  Select,
  Button,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Import icons

function EditUserModal({ isOpen, onClose, editData, handleEditChange, handleStatusChange, handleEditSubmit }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [formErrors, setFormErrors] = useState({}); // State for form validation errors

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(""); 
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setError(""); 
  };

  const validateForm = () => {
    const errors = {};
    if (!editData.fullName) {
      errors.fullName = "Họ và tên là bắt buộc!";
    }
    if (!editData.email) {
      errors.email = "Email là bắt buộc!";
    }
    if (!editData.phone) {
      errors.phone = "Số điện thoại là bắt buộc!";
    }
    if (!password) {
      errors.password = "Mật khẩu mới là bắt buộc!";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu không trùng khớp!";
    }
    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    handleEditSubmit({ ...editData, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chỉnh sửa thông tin người dùng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4" isInvalid={!!formErrors.fullName}>
            <FormLabel>Họ và tên</FormLabel>
            <Input
              name="fullName"
              value={editData.fullName}
              onChange={handleEditChange}
            />
            <FormErrorMessage>{formErrors.fullName}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={!!formErrors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={editData.email}
              onChange={handleEditChange}
            />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={!!formErrors.phone}>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              name="phone"
              value={editData.phone}
              onChange={handleEditChange}
            />
            <FormErrorMessage>{formErrors.phone}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={!!formErrors.password}>
            <FormLabel>Mật khẩu mới</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={handlePasswordChange}
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
            <FormLabel>Xác nhận mật khẩu</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
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
            <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Phân quyền</FormLabel>
            <Select
              name="role"
              value={editData.role}
              onChange={handleEditChange}
              placeholder="Chọn phân quyền"
            >
              <option value="student">Sinh viên</option>
              <option value="manager">Quản lý thư viện</option>
              <option value="admin">Admin</option>
            </Select>
          </FormControl>
          <FormControl display="flex" alignItems="center" justifyContent="space-between" mt="4">
            <FormLabel htmlFor="status-switch" mb="0">
              Trạng thái tài khoản
            </FormLabel>
            <Switch
              id="status-switch"
              isChecked={editData.status.toLowerCase() === "active"}
              onChange={handleStatusChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Cập nhật
          </Button>
          <Button onClick={onClose}>Hủy</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditUserModal;
