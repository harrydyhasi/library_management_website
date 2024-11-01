import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";
import TableCategory from '../../../../components/Tables/TableCategory'; 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../redux/actions/category_action';
import { Text as ChakraText } from "@chakra-ui/react";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories); 
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const textColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    dispatch(fetchCategories()); 
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px'>
        <ChakraText fontSize='xl' color={textColor} fontWeight='bold'>
          Danh mục sách
        </ChakraText>
      </CardHeader>

      <CardBody>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr my='.8rem' pl='0px' color='gray.400'>
              <Th color='gray.400'>
                <ChakraText>Mã danh mục</ChakraText>
              </Th>
              <Th color='gray.400'>
                <ChakraText>Tên danh mục</ChakraText>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <TableCategory 
                key={category._id} 
                id={category.id} 
                name={category.name} 
              />
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Categories;
