// Chakra imports
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./components/UserList";
import { fetchAllUsers } from "../../../redux/actions/user_action";

function UserManagement() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.user.allUsers);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {error && <Text color="red.500">Error loading users: {error}</Text>}
      {loading ? (
        <Flex align="center" justify="center" height="100vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <UserList
          title={"Danh sách người dùng"}
          captions={["Họ tên", "Mã số", "Phân quyền", "Số điện thoại", "Trạng thái tài khoản"]}
          data={users} 
        />
      )}
    </Flex>
  );
}

export default UserManagement;
