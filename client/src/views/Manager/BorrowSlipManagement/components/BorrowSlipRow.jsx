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
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import BorrowSlipModal from './BorrowSlipModal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

import { useDispatch } from 'react-redux';
import { updateBorrowSlip, deleteBorrowSlip } from '../../../../redux/reducers/borrowSlipReducer';
import { formatDateToDDMMYYY } from '../../../../utils/formatters/date'


function BorrowSlipRow(props) {
  const {_id, borrowed_date, return_date,status,user_id,manager_id, books} = props;
  
  // Colors
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const dispatch = useDispatch();

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
        <Flex gap="2">
        <Button
            p="0px"
            bg="transparent"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
            onClick={onOpenDelete}
          >
            <Flex color="red.500" cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px" /> 
            </Flex>
          </Button>
          <Button p="0px" bg="transparent" onClick={onOpenEdit}>
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaPencilAlt} me="4px" />     
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
        initialData={{ _id, borrowed_date, return_date, status, user_id, manager_id, books}}
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