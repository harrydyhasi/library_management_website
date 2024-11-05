import React, { useEffect, useState } from 'react';
import {
    Button,
    Flex,
    Grid,
    Icon,
    Text,
    useColorModeValue,
    VStack,
    Spinner,
    InputGroup,
    InputLeftElement,
    IconButton,
    Input,
    Select,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { FaPlus } from "react-icons/fa";
import BookCard from "./BookCard";
import { fetchAllBooks } from '../../../../redux/actions/book_action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from "../../../../redux/actions/category_action";
import ErrorAlert from '../../../../components/Alert/CustomAlert';
import { BiSearchAlt } from "react-icons/bi";

const ListBook = ({ title }) => {
    const dispatch = useDispatch();
    const textColor = useColorModeValue("gray.700", "white");
    const books = useSelector((state) => state.book.books);
    const categories = useSelector((state) => state.category.categories);
    const loading = useSelector((state) => state.book.loading);
    const error = useSelector((state) => state.book.error);
    const searchIconColor = useColorModeValue("gray.700", "gray.200");
    const inputBg = useColorModeValue("white", "gray.800");
    const mainTeal = useColorModeValue("teal.300", "teal.300");

    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12; 

    useEffect(() => {
        dispatch(fetchAllBooks());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryChange = (event) => {
        setCategoryFilter(event.target.value);
        setCurrentPage(1); 
    };

    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());

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
            <CardHeader>
                <Flex direction='column' w='100%' p='12px 0px 22px 20px'>
                    <Text fontSize='lg' color={textColor} fontWeight='bold'>
                        {title}
                    </Text>
                    
                    <Flex mt={4}>
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
                                placeholder="Nhập tên sách, mã sách, hoặc tác giả"
                                borderRadius="inherit"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
            <CardBody px='5px'>
                <Grid
                    templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
                    templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
                    gap='24px'>
                    {currentBooks.map((book) => (
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
                            pdf={book.pdf}
                        />
                    ))}
                </Grid>
                
            </CardBody>
            <Flex justify="space-between" mt={4}>
                    <Button onClick={prevPage} disabled={currentPage === 1}>Trang trước</Button>
                    <Button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredBooks.length / booksPerPage)}>Trang sau</Button>
                </Flex>
        </Card>
    );
};

export default ListBook;
