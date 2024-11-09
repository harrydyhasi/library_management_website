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
} from "@chakra-ui/react";
import { TbEdit, TbClick } from "react-icons/tb";
import { FaEye, FaTrash } from "react-icons/fa";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { formatDateToDDMMYYY } from '../../../../utils/formatters/date';
import HistoryModal from "./HistoryModal";
import { IoMdMore } from "react-icons/io";
function HistoryTableRow(props) {
  const { _id, borrowed_date, return_date, status, user_id, manager_id, books, onDelete } = props;
  const dispatch = useDispatch();

  // Colors
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const iconColor = useColorModeValue("gray", "white");

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <Tr>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {_id}
          </Text>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {formatDateToDDMMYYY(borrowed_date)}
          </Text>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {formatDateToDDMMYYY(return_date)}
          </Text>
        </Td>
        <Td>
          <Badge
            bg={
              status === "borrowed"
                ? bgStatus
                : status === "registered"
                ? "green.400"
                : "red.400"
            }
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
              onClick={onOpen}
            >
              <Flex color={iconColor} cursor="pointer" align="center" p="12px">
                <IoMdMore size="22px" />
              </Flex>
            </Button>
          </Flex>
        </Td>
      </Tr>

      <HistoryModal
        isOpen={isOpen}
        onClose={onClose}
        mode="edit"
        initialData={{ _id, borrowed_date, return_date, status, user_id, books }}
      />
      
    </>
  );
}

export default HistoryTableRow;
