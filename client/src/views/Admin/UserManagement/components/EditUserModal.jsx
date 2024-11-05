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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function EditUserModal({ isOpen, onClose, editData, handleEditChange, handleStatusChange, handleEditSubmit }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setConfirmPassword("");
      setFormErrors({});
    }
  }, [isOpen]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    return /^\d*$/.test(phone); 
  };

  const validateForm = () => {
    const errors = {};
    if (!editData.fullName) {
      errors.fullName = "Họ và tên không được để trống!";
    }
    if (!editData.email) {
      errors.email = "Email không được để trống!";
    } else if (!validateEmail(editData.email)) {
      errors.email = "Email không hợp lệ!";
    }
    if (editData.phone && !validatePhoneNumber(editData.phone)) {
      errors.phone = "Số điện thoại chỉ được phép là số!";
    }
    if (!editData.email) {
      errors.email = "Email không được để trống!";
    }
    if (password && password !== confirmPassword || !password && confirmPassword) {
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

    const updatedEditData = { ...editData };

    if (password && password === confirmPassword) {
      updatedEditData.password = password; 
    } else if (password) {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu không trùng khớp!",
      }));
      return; 
    }
    handleEditSubmit(updatedEditData); 
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chỉnh sửa thông tin người dùng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <GridItem>
              <FormControl mb="4" isInvalid={!!formErrors.fullName}>
                <FormLabel>
                  Họ và tên 
                </FormLabel>
                <Input
                  name="fullName"
                  value={editData.fullName}
                  onChange={handleEditChange}
                />
                <FormErrorMessage>{formErrors.fullName}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl mb="4" isInvalid={!!formErrors.email}>
                <FormLabel>
                  Email 
                </FormLabel>
                <Input
                  name="email"
                  type="email"
                  autoComplete="off"
                  value={editData.email}
                  onChange={handleEditChange}
                />
                <FormErrorMessage>{formErrors.email}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl mb="4" isInvalid={!!formErrors.phone}>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                  name="phone"
                  autoComplete="off"
                  value={editData.phone}
                  onChange={handleEditChange}
                />
                <FormErrorMessage>{formErrors.phone}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb="4">
                <FormLabel>Mật khẩu mới</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    name="password"
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
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl mb="4" isInvalid={!!formErrors.confirmPassword}>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
            </GridItem>
            <GridItem colSpan={2}>
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
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl display="flex" alignItems="center" justifyContent="space-between" mt="4">
                <FormLabel htmlFor="status-switch" mb="0">
                  Trạng thái tài khoản
                </FormLabel>
                <Switch
                  id="status-switch"  
                  isChecked={editData.status.toLowerCase() === "active"}
                  onChange={handleStatusChange}
                  sx={{
                    "& .chakra-switch__track": {
                      backgroundColor: editData.status.toLowerCase() === "active" ? "teal.400" : "gray.300",
                    },
                    "& .chakra-switch__thumb": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" background="teal.400" mr={3} onClick={handleSubmit}>
            Cập nhật
          </Button>
          <Button onClick={onClose}>Hủy</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditUserModal;
