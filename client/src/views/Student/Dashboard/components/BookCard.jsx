import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from 'react';
import defaultImage from '../../../../../public/images/image.png';
import DetailBook from "./DetailBook";
import Card from "components/Card/Card";

const BookCard = ({ id, name, quantity, position, author, publisher, description, category, image }) => {
    const textColor = useColorModeValue("gray.700", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentBook, setCurrentBook] = useState(null);

    const detailBook = () => {
        setCurrentBook({ id, name, quantity, position, author, publisher, description, category, image });
        onOpen();
    };

    return (
        <Card
            p='16px' my='24px' boxShadow="md"
        >
            <Box 
                position='relative' 
                borderRadius='15px' 
                overflow='hidden' 
                border='1px'
                borderColor='gray.100' >
                    <Image 
                        w="250px" 
                        height="250px" 
                        src={image ? image : defaultImage} 
                        objectFit='cover' 
                        borderRadius="15px" 
                    />
               
            </Box>
            <Flex direction='column' minWidth='250px' mt='20px'>
                <Flex justifyContent='center' mb='4px'>
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                        {name}
                    </Text>
                </Flex>
                <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Danh mục:{" "}
                    <Text as="span" color="gray.500">
                        {category.name}
                    </Text>
                </Text>
                <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Mã sách:{" "}
                    <Text as="span" color="gray.500">
                        {id}
                    </Text>
                </Text>
                <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Tác giả:{" "}
                    <Text as="span" color="gray.500">
                        {author}
                    </Text>
                </Text>
    
                <Flex justifyContent='center' mt='16px'>
                    <Button
                        colorScheme='teal'
                        borderColor='teal.300'
                        color='teal.300'
                        variant='outline'
                        p='8px 20px'
                        onClick={detailBook}
                    >
                        Xem chi tiết
                    </Button>
                </Flex>
            </Flex>
            <DetailBook isOpen={isOpen} onClose={onClose} currentBook={currentBook} />
        </Card>
    );
    
};

export default BookCard;
