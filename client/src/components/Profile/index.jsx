import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileInformation from "./components/ProfileInformation";
import { Flex, useColorModeValue, Text, Box, useToast, Spinner } from "@chakra-ui/react";
import avatar4 from "../../assets/img/avatars/avatar4.png";
import ProfileBgImage from "../../assets/img/ProfileBackground.png";
import { FaCube, FaPenFancy } from "react-icons/fa";
import Header from "./components/Header";
import { fetchUser, updateUser, clearError } from "../../redux/actions/user_action";

function Profile() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, user, error } = useSelector((state) => state.user);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ fullName: "", phone: "" });

  useEffect(() => {
    if (loggedInUser && loggedInUser.id) {
      dispatch(fetchUser(loggedInUser.id));
    }
  }, [dispatch, loggedInUser]);

  useEffect(() => {
    if (user) {
      setEditData({ fullName: user.fullName, phone: user.phone });
    }
  }, [user]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = async () => {
    dispatch(clearError());
    try {
      console.log(editData);
      await dispatch(updateUser(user.id, editData));
      toast({
        title: "Thành công.",
        description: "Thông tin cá nhân đã được cập nhật!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setIsEditing(false);
      dispatch(fetchUser(loggedInUser.id));
    } catch (e) {
      toast({
        title: "An error occurred.",
        description: e.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Flex direction="column" bg={useColorModeValue("gray.50", "gray.800")} minH="100vh">
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={useColorModeValue("hsla(0,0%,100%,.8)", "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)")}
        avatarImage={avatar4}
        name={loading ? "Loading..." : user?.fullName || "Unknown username"}
        email={loading ? "Loading..." : user?.email || "unknown@example.com"}
        role={loading ? "Loading..." : user?.role || "unknown"}
        status={loading ? "Loading..." : user?.status || ""}
        tabs={[
          { name: "OVERVIEW", icon: <FaCube w="24px" h="24px" /> },
          { name: "TEAMS", icon: <FaPenFancy w="24px" h="24px" /> },
          { name: "PROJECTS", icon: <FaPenFancy w="24px" h="24px" /> },
        ]}
      />

      <Flex direction="column" minH="100vh">
        {loading ? (
          <Flex justifyContent="center" mt="5">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : error ? (
          <Text fontSize="xl" textAlign="center" color="red.500" mt="5">
            {error}
          </Text>
        ) : (
          <Box p="4">
            <ProfileInformation
              title="Thông tin cá nhân"
              id={user?.id || "Unknown Id"}
              fullName={editData.fullName}
              phone={editData.phone}
              email={user?.email || "unknown@example.com"}
              isEditing={isEditing}
              onEditToggle={() => setIsEditing(!isEditing)}
              onSave={handleEditSubmit}
              handleEditChange={handleEditChange}
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default Profile;
