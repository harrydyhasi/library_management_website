import { Flex, Text, useColorModeValue, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

const ProfileInformation = ({
  title,
  id,
  fullName,
  phone,
  email,
  isEditing,
  onEditToggle,
  onSave,
  handleEditChange,
}) => {
  const textColor = useColorModeValue("gray.700", "white");

  const handleSave = () => {
    onSave();
    onEditToggle();
  };

  return (
    <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody px="5px">
        <Flex direction="column">
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Mã số:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {id}
            </Text>
          </Flex>

          {/* Editable Name */}
          <Flex align="center" mb="18px">
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
              />
            ) : (
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {fullName}
              </Text>
            )}
          </Flex>

          {/* Editable Mobile */}
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Số điện thoại:{" "}
            </Text>
            {isEditing ? (
              <Input
                name="phone" 
                value={phone}
                onChange={handleEditChange}
                size="sm"
              />
            ) : (
              <Text fontSize="md" color="gray.500" fontWeight="400">
                {phone}
              </Text>
            )}
          </Flex>

          {/* Email Display */}
          <Flex align="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Email:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              {email}
            </Text>
          </Flex>

          {/* Edit/Save Buttons */}
          {!isEditing ? (
            <Button
              colorScheme='teal'
              borderColor='teal.300'
              color='teal.300'
              variant='outline'
              ml={4}
              p='8px 20px'
             onClick={onEditToggle}>
              Chỉnh sửa thông tin
            </Button>
          ) : (
            <Flex justify="space-between" mt="4">
              <Button colorScheme="teal" onClick={handleSave}>
                Lưu
              </Button>
              <Button 
                colorScheme='teal.500'
                borderColor='teal.500'
                color='teal.500'
                variant='outline'
                p='8px 20px'
                mr='32px'
                onClick={onEditToggle} >
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
