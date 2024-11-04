import React, { useEffect, useState } from 'react';
import {
    Button,
    Flex,
    Grid,
    Icon,
    Text,
    useColorModeValue,
    VStack,
    Spinner
  } from "@chakra-ui/react";
  // Assets
  // Custom components
  import Card from "components/Card/Card";
  import CardBody from "components/Card/CardBody";
  import CardHeader from "components/Card/CardHeader";
  import { FaPlus } from "react-icons/fa";
  import BookCard from "./BookCard";
  import { fetchAllBooks } from '../../../../redux/actions/book_action'; // Ensure correct path
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchCategories } from "../../../../redux/actions/category_action";
  import ErrorAlert from '../../../../components/Alert/CustomAlert';

  
  const ListBook = ({ title }) => {
    // Chakra color mode
    const dispatch = useDispatch();
    const textColor = useColorModeValue("gray.700", "white");
    const books = useSelector((state) => state.book.books)
    const categories = useSelector((state) => state.category.categories);
    const loading = useSelector((state) => state.book.loading);
    const error = useSelector((state) => state.book.error);

    useEffect(() => {
      dispatch(fetchAllBooks());
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
    return (
      <Card p='16px' my='24px'>
        <CardHeader p='12px 5px' mb='12px' ml='20px'>
          <Flex direction='column'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              {title}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody px='5px'>
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap='24px'>
              {
                books.map((book) => (
                  <BookCard
                    key={book._id}
                    id={book.id}
                    name={book.name}
                    quantity={book.quantity}
                    position={book.position}
                    author={book.author}
                    publisher={book.publisher}
                    description={book.description}
                    category={book.category_id}
                    image={book.image}
                  />
                ))
              }
            
          </Grid>
        </CardBody>
      </Card>
    );
  };
  
  export default ListBook;
  