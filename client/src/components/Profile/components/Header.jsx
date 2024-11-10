import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Badge,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react";
import React from "react";
import ProfileInformation from "./ProfileInformation";

const Header = ({
  backgroundHeader,
  status,
  role,
  loading,
  error,
  user,
  isEditing,
  editData,
  setIsEditing,
  handleEditSubmit,
  handleEditChange
}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderProfileColor = useColorModeValue("white", "rgba(255, 255, 255, 0.31)");
  const emailColor = useColorModeValue("gray.400", "gray.300");

  const bgStatus = status === "active" ? "green.400" : "red.400";
  const colorStatus = "white";
  const bgRole = role === "admin" ? "blue.400" : role === "manager" ? "orange.300" : "teal.500";
  const colorRole = "white";

  return (
    <Box
      mb={{ sm: "205px", md: "75px", xl: "70px" }}
      borderRadius="15px"
      px="0px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      align="center"
    >
      <Box
        bgImage={backgroundHeader}
        w="100%"
        h="300px"
        borderRadius="25px"
        bgPosition="50%"
        bgRepeat="no-repeat"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <Flex direction="column" minH="100%">
          {loading ? (
            <Flex justifyContent="center" mt="5">
              <Spinner size="xl" color="blue.500" />
            </Flex>
          ) : error ? (
            <Text fontSize="xl" textAlign="center" color="red.500" mt="5">
              {error}
            </Text>
          ) : (
            <Flex direction="column" align="center" pt={"10%"} >
              <Box
                mb={{ sm: "205px", md: "75px", xl: "70px" }}
                borderRadius="15px"
                px="0px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                    align="center"
                    w={"100%"}
                width={{ base: "90%", sm: "50%", md: "70%", lg: "60%", xl: "100%" }}
              >
                <ProfileInformation
                  title="Thông tin cá nhân"
                  id={user?.id || "Unknown Id"}
                  fullName={editData.fullName}
                  phone={editData.phone}
                  role={user?.role}
                  email={user?.email || "unknown@example.com"}
                  isEditing={isEditing}
                  onEditToggle={() => setIsEditing(!isEditing)}
                  onSave={handleEditSubmit}
                  handleEditChange={handleEditChange}
                />
              </Box>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
