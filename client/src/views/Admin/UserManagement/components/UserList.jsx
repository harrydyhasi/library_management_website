import React, { useState } from "react";
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Flex,
  Input,
  Select,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  IconButton,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TableRow from "../components/TableRow";
import { HiUserAdd } from "react-icons/hi";
import { useUserLogic } from '../utils/userUtils'; 

const UserList = ({ title, captions, data = [] }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newUserData, setNewUserData] = useState({ fullName: '', email: '', password: '', phone: '', role: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formErrors, setFormErrors] = useState({}); 

  const { handleInputChange, handleCreateUser, filterData } = useUserLogic();

  const filteredData = filterData(data, searchQuery);

  const validateForm = () => {
    const errors = {};
    if (!newUserData.fullName) {
      errors.fullName = "Họ và tên là bắt buộc!";
    }
    if (!newUserData.email) {
      errors.email = "Email không được để trống!";
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
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader>
        <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Flex align="center">
            <InputGroup
              cursor="pointer"
              bg="white"
              borderRadius="15px"
              w={{ sm: "128px", md: "200px" }}
              me={{ sm: "auto", md: "20px" }}
              _focus={{ borderColor: "teal" }}
              _active={{ borderColor: "teal" }}
            >
              <InputLeftElement>
                <IconButton
                  bg="inherit"
                  borderRadius="inherit"
                  _hover="none"
                  _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
                  _focus={{ boxShadow: "none" }}
                  icon={<SearchIcon color="gray.500" w="15px" h="15px" />}
                />
              </InputLeftElement>
              <Input
                fontSize="xs"
                py="11px"
                placeholder="Nhập tên, email..."
                borderRadius="inherit"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Button leftIcon={<HiUserAdd />} colorScheme="teal" background="teal.300" onClick={onOpen} ml={4}>
              Thêm người dùng
            </Button>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => (
                <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                  {caption}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow
                  key={row._id}
                  id={row.id}
                  fullName={row.fullName}
                  email={row.email}
                  phone={row.phone}
                  role={row.role}
                  status={row.status}
                />
              ))
            ) : (
              <Tr>
                <Td colSpan={captions.length}>
                  <Text textAlign="center" color="gray.500">
                    Không có người dùng nào
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </CardBody>

      {/* Create New User Modal */}
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
                onChange={handleInputChange(newUserData, setNewUserData)}
                placeholder="Nhập họ và tên"
              />
              <FormErrorMessage>{formErrors.fullName}</FormErrorMessage>
            </FormControl>
            <FormControl mb="4" isInvalid={!!formErrors.email}>
              <FormLabel>Email <span style={{ color: 'red' }}>*</span></FormLabel>
              <Input
                name="email"
                type="email"
                value={newUserData.email}
                onChange={handleInputChange(newUserData, setNewUserData)}
                placeholder="Nhập email"
              />
              <FormErrorMessage>{formErrors.email}</FormErrorMessage>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Số điện thoại</FormLabel>
              <Input
                name="phone"
                value={newUserData.phone}
                onChange={handleInputChange(newUserData, setNewUserData)}
                placeholder="Nhập số điện thoại"
              />
            </FormControl>
            <FormControl mb="4" isInvalid={!!formErrors.password}>
              <FormLabel>Mật khẩu <span style={{ color: 'red' }}>*</span></FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={newUserData.password}
                  onChange={handleInputChange(newUserData, setNewUserData)}
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
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setFormErrors((prev) => ({ ...prev, confirmPassword: '' })); // Reset confirm password error
                  }}
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
                onChange={handleInputChange(newUserData, setNewUserData)}
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
    </Card>
  );
};

export default UserList;
