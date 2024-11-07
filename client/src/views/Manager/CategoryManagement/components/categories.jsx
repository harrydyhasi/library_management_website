import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
  Flex,
  Button,
  InputGroup,
  Text,
  InputLeftElement,
  IconButton,
  Input,
  Alert,
  Spinner,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";
import TableCategory from './TableCategory';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../redux/actions/category_action';
import { BiSearchAlt } from "react-icons/bi";
import ErrorAlert from '../../../../components/Alert/CustomAlert';
import AddCategoryDialog from './AddCategory';
import { IoAdd } from "react-icons/io5";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const textColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("white", "gray.800");
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </VStack>
    );
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const filteredCategories = categories.filter(category =>
    category.id.toString().includes(searchQuery) ||
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    setCurrentCategory(null); 
    onOpen();
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category); 
    onOpen();
  };

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader>
        <Flex direction="column" w='100%' p='12px 0px 22px 20px'>
          <Flex>
            <Text fontSize='xl' color={textColor} fontWeight='bold' pl='8px'>
              Danh mục sách
            </Text>
          </Flex>
          <Flex justify='space-between' align='center' w='100%' mb="10px" p='0px' my='20px'>
            <InputGroup
              bg={inputBg}
              borderRadius="15px"
              w="300px"
              _focus={{
                borderColor: mainTeal,
              }}
              _active={{
                borderColor: mainTeal,
              }}
            >
              <InputLeftElement>
                <IconButton
                  bg="inherit"
                  borderRadius="inherit"
                  _hover="none"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                  icon={<BiSearchAlt color={searchIconColor} w="15px" h="15px" />}
                />
              </InputLeftElement>
              <Input
                fontSize="xs"
                py="11px"
                placeholder="Nhập mã hoặc tên danh mục"
                borderRadius="inherit"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Button
              colorScheme="teal" background="teal.300" p='8px 20px'
              onClick={handleAddCategory}
            >
              Thêm danh mục mới
            </Button>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Flex direction="column" w='100%' p='12px 0px 22px 20px'>
          <Table variant='simple' color={textColor}>
            <Thead>
              <Tr my='.8rem' pl='0px' color='gray.400'>
                <Th color='gray.400' ps='0px'>
                  <Text>Mã danh mục</Text>
                </Th>
                <Th color='gray.400' ps='0px'>
                  <Text>Tên danh mục</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCategories.map((category) => (
                <TableCategory
                  key={category._id}
                  id={category.id}
                  name={category.name}
                  onEdit={handleEditCategory} 
                />
              ))}
            </Tbody>
          </Table>
        </Flex>
      </CardBody>

      <AddCategoryDialog 
        isOpen={isOpen}
        onClose={() => {
          setCurrentCategory(null); 
          onClose();
        }}
        currentCategory={currentCategory}
      />
    </Card>
  );
};

export default Categories;
