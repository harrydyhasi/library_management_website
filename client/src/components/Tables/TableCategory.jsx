import {
  Td,
  Text,
  Tr,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TableCategory({ id, name }) {
  const textColor = useColorModeValue("gray.700", "white");

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
        <Button p="0px" bg="transparent" variant="no-hover">
          <Text fontSize="md" color="gray.400" fontWeight="bold" cursor="pointer">
            Edit
          </Text>
        </Button>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover">
          <Text fontSize="md" color="gray.400" fontWeight="bold" cursor="pointer">
            Delete
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default TableCategory;
