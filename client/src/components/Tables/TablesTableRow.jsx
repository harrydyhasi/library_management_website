import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
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
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast, 
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from '../../redux/actions/user_action'; // Adjust the path according to your file structure

function TablesTableRow(props) {
  const { id, fullName, email, phone, status, role, logo, onUserUpdated, onUserDeleted } = props; // Added props for callbacks
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  // Edit Modal Controls
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [editData, setEditData] = useState({ fullName, email, phone, role });

  // Delete Confirmation Controls
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const dispatch = useDispatch();
  const toast = useToast(); // Create a toast instance

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await dispatch(updateUser(id, editData)); // Update user with the editData
      toast({
        title: "Thành công.",
        description: "Thông tin người dùng đã được chỉnh sửa!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      // onUserUpdated(); 
      onEditClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error updating user.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(id));
      toast({
        title: "Thành công.",
        description: "Xóa người dùng thành công!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose();
    } catch (error) {
      toast({
        title: "Xảy ra lỗi.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "200px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
              {fullName}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {id}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {role}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {phone}
        </Text>
      </Td>

      <Td>
        <Badge
          bg={status === "active" ? "green.400" : bgStatus}
          color={status === "active" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>

      <Td width={50}>
        <Button onClick={onEditOpen} p="0px" bg="transparent" variant="no-hover">
          <Text fontSize="md" color="teal.300" fontWeight="bold" cursor="pointer">
            Chỉnh sửa
          </Text>
        </Button>
      </Td>

      <Td width={50}>
        <Button onClick={onDeleteOpen} p="0px" bg="transparent" variant="no-hover">
          <Text fontSize="md" color="red.300" fontWeight="bold" cursor="pointer">
            Xóa
          </Text>
        </Button>
      </Td>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh sửa thông tin người dùng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Họ và tên</FormLabel>
              <Input
                name="fullName"
                value={editData.fullName}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={editData.email}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Số điện thoại</FormLabel>
              <Input
                name="phone"
                value={editData.phone}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Phân quyền</FormLabel>
              <Select
                name="role"
                value={editData.role} // This sets the current value as selected
                onChange={handleEditChange}
                placeholder="Chọn vai trò" // Placeholder shown when no option is selected
              >
                <option value="student">Sinh viên</option>
                <option value="manager">Quản lý thư viện</option>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
              Save
            </Button>
            <Button onClick={onEditClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa người dùng
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc muốn xóa {fullName}?.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Tr>
  );
}

export default TablesTableRow;
