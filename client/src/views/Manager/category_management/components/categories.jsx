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
import TableCategory from '../../../../components/Tables/TableCategory';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../redux/actions/category_action';
import { BiSearchAlt } from "react-icons/bi";
import ErrorAlert from '../../../../components/Alert/CustomAlert';
import AddCategoryDialog from './add_category';
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

  const handleAddCategory = (newCategory) => {
    console.log("Adding category:", newCategory);
  };

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='0px 0px 0px 0px'>
        <Flex direction="column" w='100%' p='12px 0px 22px 0px'>
        <Flex>
        <Text fontSize='xl' color={textColor} fontWeight='bold'>
              Danh mục sách
            </Text>
          </Flex>
          <Flex justify='space-between' align='center' w='100%' mb="10px" p='12px'>
            
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
              colorScheme='teal'
              borderColor='teal.300'
              color='teal.300'
              variant='outline'
              fontSize='sm'
              p='8px 20px'
              onClick={onOpen}
            >
              <IoAdd size= '18px'/>
              Thêm danh mục mới
            </Button>
          </Flex>
          
        </Flex>
      </CardHeader>

      <CardBody>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr my='.8rem' pl='0px' color='gray.400'>
              <Th color='gray.400'>
                <Text>Mã danh mục</Text>
              </Th>
              <Th color='gray.400'>
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
              />
            ))}
          </Tbody>
        </Table>
      </CardBody>

      <AddCategoryDialog 
        isOpen={isOpen}
        onClose={onClose}
        onAdd={handleAddCategory}
      />
    </Card>
  );
};

export default Categories;
