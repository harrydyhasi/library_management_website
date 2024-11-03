import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Icon
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function BorrowSlipRow(props) {
  const {_id, borrowed_date, return_date,status,user,manager } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
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
          {borrowed_date}
        </Text>
      </Td>
      {/* RETURNED DATE */}
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {return_date}
        </Text>
      </Td>

      {/* STATUS */}
      <Td>
        <Badge
          bg={status === "borrowed" ? "green.400" : bgStatus}
          color={status === "Online" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>

      <Td>
        <Flex gap="2">
        <Button
            p="0px"
            bg="transparent"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
          >
            <Flex color="red.500" cursor="pointer" align="center" p="12px">
              <Icon as={FaTrashAlt} me="4px" /> 
            </Flex>
          </Button>
          <Button p="0px" bg="transparent">
            <Flex color={textColor} cursor="pointer" align="center" p="12px">
              <Icon as={FaPencilAlt} me="4px" />     
            </Flex>
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}

export default BorrowSlipRow;