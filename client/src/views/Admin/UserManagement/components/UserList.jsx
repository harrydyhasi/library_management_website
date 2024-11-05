import React, { useState } from "react";
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
  Button,
  Flex,
  Input,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  IconButton,
  Select, 
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import TableRow from "../components/TableRow";
import { HiUserAdd } from "react-icons/hi";
import { useUserLogic } from '../utils/userUtils'; 
import CreateUserModal from './CreateUserModal'; 

const UserList = ({ title, captions, data = [] }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newUserData, setNewUserData] = useState({ fullName: '', email: '', password: '', phone: '', role: '' });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); 

  const [formErrors, setFormErrors] = useState({}); 

  const { handleCreateUser, filterData } = useUserLogic();

  const filteredData = filterData(data, searchQuery).filter(user => {
    return selectedRole ? user.role === selectedRole : true; 
  });

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader>
        <Flex direction="column" justify='space-between' minHeight='60px' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
            <Flex align="center" direction="row" justify='space-between' my={4}>
              <Flex align="center">
                <Select
                placeholder="Chọn vai trò"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                  width="200px"
                  fontSize="sm"
                  marginRight="20px"
                borderRadius="15px"
                  
              >
                <option value="student">Sinh viên</option>
                <option value="manager">Quản lý thư viện</option>
                <option value="admin">Admin</option>
                </Select>
                <InputGroup
                  cursor="pointer"
                  bg="white"
                  borderRadius="15px"
                  w={{ sm: "150px", md: "220px" }}
                  me={{ sm: "auto", md: "20px" }}
                  _focus={{ borderColor: "teal" }}
                  _active={{ borderColor: "teal" }}
                >
                  <InputLeftElement>
                    <IconButton
                      bg="inherit"
                      borderRadius="inherit"
                      _hover="none"
                      _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
                      _focus={{ boxShadow: "none" }}
                      icon={<SearchIcon color="gray.500" w="15px" h="15px" />}
                    />
                  </InputLeftElement>
                  <Input
                    fontSize="xs"
                    py="11px"
                    placeholder="Nhập tên, email, mã số..."
                    borderRadius="inherit"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Flex>
              <Button leftIcon={<HiUserAdd />} colorScheme="teal" background="teal.300" onClick={onOpen} ml={4}>
                Thêm người dùng
              </Button>
            </Flex>
      </Flex>
        

      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => (
                <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                  {caption}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow
                  key={row._id}
                  id={row.id}
                  fullName={row.fullName}
                  email={row.email}
                  phone={row.phone}
                  role={row.role}
                  status={row.status}
                  password={row.password}
                />
              ))
            ) : (
              <Tr>
                <Td colSpan={captions.length}>
                  <Text textAlign="center" color="gray.500">
                    Không có người dùng nào
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </CardBody>

      {/* Create New User Modal */}
      <CreateUserModal
        isOpen={isOpen}
        onClose={onClose}
        handleCreateUser={handleCreateUser}
        newUserData={newUserData}
        setNewUserData={setNewUserData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
      />
    </Card>
  );
};

export default UserList;
