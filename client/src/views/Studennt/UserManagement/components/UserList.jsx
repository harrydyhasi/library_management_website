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
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TableRow from "../components/TableRow";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from '@/redux/actions/user_action.js'; // Adjust the path according to your file structure

const UserList = ({ title, captions, data = [] }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newUserData, setNewUserData] = useState({ fullName: '', email: '', password: '', phone: '', role: '' });
  const dispatch = useDispatch();
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateUser = async () => {
    if (!newUserData.email || !newUserData.password || !newUserData.role) {
      toast({
        title: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
      return;
    }

    try {
      await dispatch(createUser(newUserData));
      toast({
        title: "User created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
      onClose(); 
      setNewUserData({ fullName: '', email: '', password: '', phone: '', role: '' }); 
    } catch (error) {
      toast({
        title: "Error creating user: " + error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  };

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader>
        <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Button leftIcon={<AddIcon />} colorScheme="teal" background="teal.300" onClick={onOpen} ml={4}>
            Thêm người dùng
          </Button>
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
            {data.length > 0 ? (
              data.map((row) => (
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
            <FormControl mb="4">
              <FormLabel>Họ và tên</FormLabel>
              <Input
                name="fullName"
                value={newUserData.fullName}
                onChange={handleInputChange}
                placeholder="Nhập họ và tên"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={newUserData.email}
                onChange={handleInputChange}
                placeholder="Nhập email"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Mật khẩu</FormLabel>
              <Input
                name="password"
                type="password"
                value={newUserData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Số điện thoại</FormLabel>
              <Input
                name="phone"
                value={newUserData.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Phân quyền</FormLabel>
              <Select
                name="role"
                value={newUserData.role}
                onChange={handleInputChange}
                placeholder="Chọn phân quyền"
              >
                <option value="student">Sinh viên</option>
                <option value="manager">Quản lý thư viện</option>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateUser}>
              Tạo
            </Button>
            <Button onClick={onClose}>Hủy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default UserList;
