// Chakra imports
import { Flex } from "@chakra-ui/react";
import Books from "./components/Books";

function BookManagement() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Books/>
    </Flex>
  );
}

export default BookManagement;
