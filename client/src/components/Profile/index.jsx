import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileInformation from "./components/ProfileInformation";
import { Flex, useColorModeValue, Text, Box, useToast, Spinner } from "@chakra-ui/react";
import ProfileBgImage from "../../assets/img/ProfileBackground.png";
import { fetchUser, updateUser, clearError } from "../../redux/actions/user_action";
import defaultImage from '/images/image.png?url';
import Header from "./components/Header";

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
      await dispatch(updateUser(user.id, editData));
      toast({
        title: "Success.",
        description: "Profile updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setIsEditing(false);
      dispatch(fetchUser(loggedInUser.id));
    } catch (e) {
      toast({
        title: "Error",
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
        avatarImage={defaultImage}
        name={loading ? "Loading..." : user?.fullName || "Unknown username"}
        email={loading ? "Loading..." : user?.email || "unknown@example.com"}
        role={loading ? "Loading..." : user?.role || "unknown"}
        status={loading ? "Loading..." : user?.status || ""}
        loading={loading}
        error={error}
        user={user}
        isEditing={isEditing}
        editData={editData}
        setIsEditing={setIsEditing}
        handleEditSubmit={handleEditSubmit}
        handleEditChange={handleEditChange}
      />
    </Flex>
  );
}

export default Profile;
