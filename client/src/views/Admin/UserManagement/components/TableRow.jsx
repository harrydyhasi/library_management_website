import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from '../../../../redux/actions/user_action';
import EditUserModal from "./EditUserModal";
import DeleteUserDialog from "./DeleteUserDialog";

function TableRow(props) {
  const { id, fullName, email, phone, status, role, logo, password } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [editData, setEditData] = useState({ fullName, email, phone, role, status, password });

  const dispatch = useDispatch();
  const toast = useToast();

  const handleEditChange = (e) => {
    
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = () => {
    setEditData((prevData) => ({
      ...prevData,
      status: prevData.status.toLowerCase() === "active" ? "locked" : "active",
    }));
  };

  const handleEditSubmit = async () => {
    try {
      console.log(editData);

      await dispatch(updateUser(id, editData)); 
      toast({
        title: "Thành công.",
        description: "Thông tin người dùng đã được cập nhật!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      onEditClose();
    } catch (error) {
      console.error("Chỉnh sửa thông tin thất bại:", error);
      toast({
        title: "Chỉnh sửa thông tin thất bại.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
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
        position: "bottom-right",
      });
      onDeleteClose();
    } catch (error) {
      toast({
        title: "Xảy ra lỗi.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
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
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {id}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {role === "admin" ? 'Admin' : role === "manager" ? "Quản lý thư viện" : "Sinh viên"}
        </Text>
      </Td>


      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold">
          {phone}
        </Text>
      </Td>

      <Td >
        <Badge
          bg={status === "active" ? "green.400" : bgStatus}
          color={status === "active" ? "white" : colorStatus}
          fontSize="14px"
          p="5px 12px"
          borderRadius="8px"
        >
          {status === "active" ? 'Hoạt động' : 'Đã Bị khóa'}
        </Badge>
      </Td>

      <Td width={50}>
        <Button onClick={onEditOpen} p="0px" bg="transparent" variant="no-hover">
          <Text fontSize="sm" color="blue.400" fontWeight="bold" cursor="pointer">
            Chỉnh sửa
          </Text>
        </Button>
      </Td>

      <Td width={50}>
        <Button onClick={onDeleteOpen} p="0px" bg="transparent" variant="no-hover">
          <Text fontSize="sm" color="red.300" fontWeight="bold" cursor="pointer">
            Xóa
          </Text>
        </Button>
      </Td>

      <EditUserModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        editData={editData}
        handleEditChange={handleEditChange}
        handleStatusChange={handleStatusChange}
        handleEditSubmit={handleEditSubmit}
      />

      <DeleteUserDialog
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        handleDelete={handleDelete}
        fullName={fullName}
      />
    </Tr>
  );
}

export default TableRow;
