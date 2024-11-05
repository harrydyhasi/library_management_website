import React, { useEffect, useState } from 'react';
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
  Spinner,
  VStack,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";
import { BiSearchAlt } from "react-icons/bi";
import { fetchAllBooks } from '../../../../redux/actions/book_action';
import { useDispatch, useSelector } from 'react-redux';
import TableBook from './TableBook';
import AddBook from './AddBook'; 
import ErrorAlert from '../../../../components/Alert/CustomAlert';
import { fetchCategories } from "../../../../redux/actions/category_action";

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.book.loading);
  const error = useSelector((state) => state.book.error);
  const textColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("white", "gray.800");
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentBook, setCurrentBook] = useState(null); 

  // Thêm trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10; // Số lượng sách mỗi trang

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

  const handleEditBook = (book) => {
    setCurrentBook(book);
    onOpen(); 
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    setCurrentPage(1);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = 
      book.name.toLowerCase().includes(searchQuery) ||
      book.id.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery) ||
      book.quantity.toString().includes(searchQuery) ||
      book.position.toLowerCase().includes(searchQuery);
  
    const matchesCategory = categoryFilter ? 
      (book.category_id && book.category_id.id === categoryFilter) : true;
    
    return matchesSearch && matchesCategory;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader>
        <Flex direction="column" w='100%' p='12px 0px 22px 20px'>
          <Flex justifyContent={'space-between'}>
            <Text fontSize='xl' color={textColor} fontWeight='bold' pl='8px'>
              Tất cả sách
            </Text>
            <Button
              colorScheme="teal" background="teal.300" p='16px 20px' mr={8} onClick={() => { setCurrentBook(null); onOpen(); }} ml={4}
            >
              Thêm sách mới
            </Button>
          </Flex>
          <Flex align='center' w='100%' mb="10px" p='0px' my='20px'>
            <InputGroup
              bg={inputBg}
              borderRadius="15px"
              w="300px"
              _focus={{ borderColor: mainTeal }}
              _active={{ borderColor: mainTeal }}
            >
              <InputLeftElement>
                <IconButton
                  bg="inherit"
                  borderRadius="inherit"
                  _hover="none"
                  _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
                  _focus={{ boxShadow: "none" }}
                  icon={<BiSearchAlt color={searchIconColor} w="15px" h="15px" />}
                />
              </InputLeftElement>
              <Input
                fontSize="xs"
                py="11px"
                placeholder="Tìm kiếm theo tên sách, mã sách, tác giả, số lượng, vị trí"
                borderRadius="inherit"
                onChange={handleSearch}
                value={searchQuery}
              />
            </InputGroup>
            
            <Flex ml={8}>
            <Select
              placeholder="Tất cả"
              onChange={handleCategoryChange}
              value={categoryFilter}
              w="200px"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Flex>
          </Flex>
          
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w='100%' p='12px 0px 22px 20px'>
          <Table variant='simple' color={textColor}>
            <Thead>
              <Tr my='.8rem' pl='0px' color='gray.400'>
                <Th color='gray.400' ps='0px'><Text></Text></Th>
                <Th color='gray.400' ps='0px'><Text>Mã sách</Text></Th>
                <Th color='gray.400' ps='0px'><Text>Tên sách</Text></Th>
                <Th color='gray.400' ps='0px'><Text>Danh mục</Text></Th>
                <Th color='gray.400' ps='0px'><Text>Số lượng</Text></Th>
                <Th color='gray.400' ps='0px'><Text>Vị trí</Text></Th>
                <Th color='gray.400' ps='0px'><Text>Tác giả</Text></Th>
                <Th color='gray.400' ps='0px'><Text>NXB</Text></Th>
                <Th color='gray.400' ps='0px'><Text>Mô tả</Text></Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentBooks.map((book) => (
                <TableBook
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
                  pdf={book.pdf}
                  onEdit={handleEditBook} 
                />
              ))}
            </Tbody>
          </Table>
          <Flex justify="space-between" mt={4}>
            <Button onClick={prevPage} disabled={currentPage === 1}>Trang trước</Button>
            <Button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredBooks.length / booksPerPage)}>Trang sau</Button>
          </Flex>
        </Flex>
      </CardBody>

      <AddBook isOpen={isOpen} onClose={onClose} currentBook={currentBook} categories={categories}/>
    </Card>
  );
};

export default Books;
