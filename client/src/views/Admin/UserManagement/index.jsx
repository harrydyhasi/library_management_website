// Chakra imports
import { Flex, Spinner, Text, Grid, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react"; // Add useState here
import { useDispatch, useSelector } from "react-redux";
import UserList from "./components/UserList";
import { fetchAllUsers } from "../../../redux/actions/user_action";
import UserRoleChart from "./components/UserRoleChart";
import PieChart from "./components/PieChart";

function UserManagement() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    // Fetch user count by role data
    fetch("http://localhost:3000/api/statistics/user-count-by-role")
      .then((response) => response.json())
      .then((data) => setUserCountByRole(data.userCountByRole));
  }, []);

  const users = useSelector((state) => state.user.allUsers);
  const loading = useSelector((state) => state.user.loading);
  const [userCountByRole, setUserCountByRole] = useState([]);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* {error && <Text color="red.500">Error loading users: {error}</Text>} */}
      {loading ? (
        <Flex align="center" justify="center" height="100vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <UserList
          title={"Danh sách người dùng"}
          captions={[
            "Họ tên",
            "Mã số",
            "Phân quyền",
            "Số điện thoại",
            "Trạng thái tài khoản",
          ]}
          data={users}
        />
      )}

      <Box w="100%">
        <PieChart
          data={userCountByRole}
          title="Thống kê người dùng theo phân quyền"
        />
      </Box>
    </Flex>
  );
}

export default UserManagement;
