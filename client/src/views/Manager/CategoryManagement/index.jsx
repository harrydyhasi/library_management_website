// Chakra imports
import { Flex } from "@chakra-ui/react";
import Categories from "./components/Categories";

function category_management() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Categories/>
    </Flex>
  );
}

export default category_management;
