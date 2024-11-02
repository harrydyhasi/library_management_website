import {
  Td,
  Text,
  Tr,
  Flex,
  Icon,
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import ConfirmDialog from "../Dialog/ConfirmDialog";

function TableCategory({ id, name }) {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {id}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {name}
        </Text>
      </Td>
      <Td>
        <Flex justifyContent="flex-end">
          <Button
            p="0px"
            bg="transparent"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
          >
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaPencilAlt} me="4px" />
            </Flex>
          </Button>

          <Button p="0px" bg="transparent" onClick={onOpen}>
            <Flex color="red.500" cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px" />
            </Flex>
          </Button>
        </Flex>
        <ConfirmDialog 
          isOpen={isOpen} 
          onClose={onClose} 
          onConfirm={onClose}
          message="Bạn có chắc chắn muốn xóa danh mục này không?" 
        />

      </Td>
    </Tr>
  );
}

export default TableCategory;
