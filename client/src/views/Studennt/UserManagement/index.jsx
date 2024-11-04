// Chakra imports
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./components/UserList";
import Projects from "./components/Projects";
import { fetchAllUsers } from "../../../redux/actions/user_action";
import { dashboardTableData } from "../../../variables/general";

function UserManagement() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Access users from the Redux state
  const users = useSelector((state) => state.user.allUsers);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {error && <p>Error loading users: {error}</p>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <UserList
          title={"Danh sách người dùng"}
          captions={["Họ tên", "Mã số", "Phân quyền", "Số điện thoại", "Trạng thái tài khoản"]}
          data={users} 
        />
      )}
      <Projects
        title={"Projects Table"}
        captions={["Companies", "Budget", "Status", "Completion"]}
        data={dashboardTableData}
      />
    </Flex>
  );
}

export default UserManagement;
