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
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, clearError } from "../../../../redux/actions/user_action";
import EditUserModal from "./EditUserModal";
import DeleteUserDialog from "./DeleteUserDialog";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
function TableRow(props) {
  const error = useSelector((state) => state.user.error);
  const { id, fullName, email, phone, status, role, logo, password } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [editData, setEditData] = useState({ fullName, email, phone, role, status, password });

  const [hasToastShown, setHasToastShown] = useState(false); // Track if toast has been shown
  const iconColor = useColorModeValue("gray", "white");

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

  const handleEditSubmit = async (updatedData) => {
    try {
      dispatch(clearError());
      console.log(updatedData)
      await dispatch(updateUser(id, updatedData));

      if (!hasToastShown) {
        if (error) {
          toast({
            title: "Thất bại.",
            description: error,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
        } else {
          toast({
            title: "Thành công.",
            description: "Thông tin người dùng đã được cập nhật!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
        }
        setHasToastShown(true); // Ensure toast is shown only once
        setTimeout(() => setHasToastShown(false), 3000); // Reset after toast duration
      }
      onEditClose();
    } catch (e) {
      toast({
        title: "Đã xảy ra lỗi.",
        description: e.message,
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
      if (!hasToastShown) {
        if (error) {
          toast({
            title: "Thất bại.",
            description: error,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
        } else {
          toast({
            title: "Thành công.",
            description: "Xóa người dùng thành công!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
        }
        setHasToastShown(true); // Prevent multiple toasts
        setTimeout(() => setHasToastShown(false), 3000); // Reset after toast duration
      }
      onDeleteClose();
    } catch (e) {
      toast({
        title: "Đã xảy ra lỗi.",
        description: e.message,
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

      <Td>
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

      <Flex justifyContent="flex-end" marginRight={16}>
      <Td width={50}>
        <Button onClick={onEditOpen} 
        p="0px" 
            bg="transparent" 
            mb={{ sm: "10px", md: "0px" }} 
            me={{ md: "12px" }}>
          <Flex color={iconColor} cursor="pointer" align="center" p="12px">
              <TbEdit size='20px' />
            </Flex>
        </Button>
      </Td>

      <Td width={50}>
        <Button onClick={onDeleteOpen} p="0px" bg="transparent" variant="no-hover" marginLeft='20px'>
        <Flex color="red.400" cursor="pointer" align="center" p="12px">
              <MdDeleteOutline size='21px' />
            </Flex>
        </Button>
      </Td>
      </Flex>

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
