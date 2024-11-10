import { Flex, Text, useColorModeValue, Input, Button, Badge } from "@chakra-ui/react";
import React from "react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

const ProfileInformation = ({
  title,
  id,
  fullName,
  phone,
  email,
  role,
  isEditing,
  onEditToggle,
  onSave,
  handleEditChange,
}) => {
  const textColor = useColorModeValue("gray.700", "white");

  const bgRole = role === "admin" ? "blue.400" : role === "manager" ? "orange.300" : "teal.500";
  const colorRole = "white";

  const handleSave = () => {
    onSave();
    onEditToggle();
  };

  return (
    <Card p="16px" my={{ sm: "24px", xl: "10%" }} w="1000px" > {/* Set width to 100% */}
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w={"100%"}>

          {/* Mã số */}
          <Flex direction={"row"} justify="space-between" align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Mã số:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {id}
            </Text>
          </Flex>

          {/* Editable Name */}
          <Flex justify="space-between" align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Họ và tên:{" "}
            </Text>
            {isEditing ? (
              <Input
                name="fullName"
                value={fullName}
                onChange={handleEditChange}
                size="sm"
                autoFocus
                maxW={"300px"}
              />
            ) : (
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {fullName}
              </Text>
            )}
          </Flex>

          {/* Role Badge */}
          <Flex justify="space-between" align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Vai trò:{" "}
            </Text>
            <Badge
              bgColor={bgRole}
              color={colorRole}
              fontSize="md"
              p="2"
              borderRadius="md"
            >
              {role ? role : "Unknown Role"}
            </Badge>
          </Flex>

          {/* Editable Mobile */}
          <Flex justify="space-between" align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Số điện thoại:{" "}
            </Text>
            {isEditing ? (
              <Input
                name="phone"
                value={phone}
                onChange={handleEditChange}
                size="sm"
                maxW={"300px"}
              />
            ) : (
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {phone}
              </Text>
            )}
          </Flex>

          {/* Email Display */}
          <Flex justify="space-between" align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Email:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {email}
            </Text>
          </Flex>

          {/* Edit/Save Buttons */}
          {!isEditing ? (
            <Flex direction={"row"} justify="flex-end">
              <Button
                colorScheme="teal"
                borderColor="teal.300"
                color="teal.300"
                variant="outline"
                ml={4}
                p="8px 20px"
                onClick={onEditToggle}
              >
                Chỉnh sửa thông tin
              </Button>
            </Flex>
          ) : (
            <Flex direction={"row"} justify="flex-end">
              <Button colorScheme="teal" onClick={handleSave}>
                Lưu
              </Button>
              <Button
                colorScheme="teal.500"
                borderColor="teal.500"
                color="teal.500"
                variant="outline"
                p="8px 20px"
                ml="20px"
                onClick={onEditToggle}
              >
                Hủy
              </Button>
            </Flex>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;
