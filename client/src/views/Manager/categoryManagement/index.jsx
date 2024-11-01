// Chakra imports
import { Flex } from "@chakra-ui/react";
import Categories from "./components/categories";

function Tables() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Categories
        title={"Authors Table"}
        captions={["Id", "Name", ""]}
      />
    </Flex>
  );
}

export default Tables;
