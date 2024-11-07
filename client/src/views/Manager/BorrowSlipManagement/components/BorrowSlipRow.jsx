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
  Icon,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialog
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import BorrowSlipModal from './BorrowSlipModal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { updateBorrowSlip, deleteBorrowSlip } from '../../../../redux/reducers/borrowSlipReducer';
import { formatDateToDDMMYYY } from '../../../../utils/formatters/date'


function BorrowSlipRow(props) {
  const {_id, borrowed_date, return_date,status,user_id,manager_id, books} = props;
  
  // Colors
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const iconColor = useColorModeValue("gray", "white");
  const dispatch = useDispatch();

  const {user: loggedInUser } = useSelector((state) => state.auth);
  const [manager, setManager] = useState(loggedInUser);

  // Modal state
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

  // Edit alert
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  
  const handleEdit = (data) => {
    dispatch(updateBorrowSlip({id: _id, updatedData: data }));
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteBorrowSlip(_id));
  };

  return (
    <>
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        {/* ID */}
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {_id}
        </Text>
      </Td>
      {/* BORROWED DATE */}
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {formatDateToDDMMYYY(borrowed_date)}
        </Text>
      </Td>
      {/* RETURNED DATE */}
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {formatDateToDDMMYYY(return_date)}
        </Text>
      </Td>

      {/* STATUS */}
      <Td>
        <Badge
          bg = {status === "borrowed" 
            ? bgStatus 
            : status === "registered" 
            ? "green.400" 
            : "red.400"}
          color={status === "Online" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status === "borrowed" 
          ? "Đang mượn" 
          : status === "registered" 
          ? "Đã đăng ký" 
          : "Đã trả"}
        </Badge>
      </Td>

      <Td>
        <Flex justifyContent="flex-end">
        <Button
            p="0px"
            bg="transparent"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
            onClick={onOpenEdit}
          >
            <Flex color={iconColor} cursor="pointer" align="center" p="12px">
              <TbEdit size='20px' />
            </Flex>
          </Button>
          <Button p="0px" bg="transparent"  onClick={onOpenDelete}>
          <Flex color="red.400" cursor="pointer" align="center" p="12px">
              <MdDeleteOutline size='21px' />
            </Flex>
          </Button>
        </Flex>
      </Td>
    </Tr>

    {/* Edit modal */}
    <BorrowSlipModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        mode="edit" // or "add" when needed
        initialData={{ _id, borrowed_date, return_date, status, user_id, manager_id:manager.id, books, manager_name: manager.fullName}}
        onSubmit={handleEdit}
      />

      {/* Delete alert dialog */}
      <DeleteConfirmationDialog
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        title="Xóa phiếu mượn này"
        message="Bạn có chắc muốn xóa phiếu mượn này."
        onConfirm={handleDeleteConfirm}
      ></DeleteConfirmationDialog>
    </>

  );
}

export default BorrowSlipRow;