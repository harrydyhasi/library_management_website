// Chakra imports
import { Flex, Box } from "@chakra-ui/react";
import BorrowHistory from "./components/BorrowHistory";
import Books from "./components/Books";
import { booksTableData, borrowHistoryData } from "../../../variables/general";
import PieChart from "./components/PieChart";
import { useEffect, useState } from "react";

function Tables() {
  useEffect(() => {
    // Fetch user count by role data
    fetch("http://localhost:3000/api/statistics/user-count-by-role")
      .then((response) => response.json())
      .then((data) => setUserCountByRole(data.userCountByRole));
  }, []);

  const [userCountByRole, setUserCountByRole] = useState([]);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Box w="100%">
        <PieChart
          data={userCountByRole}
          title="Thống kê người dùng theo phân quyền"
        />
      </Box>
    </Flex>
  );
}

export default Tables;
