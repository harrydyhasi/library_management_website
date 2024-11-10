import React, { useEffect, useState } from "react";
import { Flex, Box, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import PieChart from "./components/PieChart";

function Statistics() {
  const [userCountByRole, setUserCountByRole] = useState([]);

  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:3000/api/statistics/user-count-by-role")
      .then((response) => response.json())
      .then((data) => setUserCountByRole(data.userCountByRole))
      .catch((error) => {
        toast({
          title: "Error fetching data",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, [toast]);

  
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} px={6}>
      <Box w="100%" mb={8}>
        <PieChart
          data={userCountByRole}
          title="Thống kê người dùng theo phân quyền"
        />
      </Box>
    </Flex>
  );
}

export default Statistics;
