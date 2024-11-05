import React, { useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Text,
    useColorModeValue,
    Image,
    Flex,
    Center,
    Box
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, updateBook } from '../../../../redux/actions/book_action';
import CustomToast from '../../../../components/Toast/CustomToast';
import defaultImage from '/images/image.png?url';

const DetailBook = ({ isOpen, onClose, currentBook }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const [bookImage, setBookImage] = React.useState(defaultImage);
    const [bookName, setBookName] = React.useState('');
    const [bookIdCategory, setBookIdCategory] = React.useState('');
    const [bookNameCategory, setBookNameCategory] = React.useState('');
    const [bookQuantity, setBookQuantity] = React.useState('');
    const [bookPosition, setBookPosition] = React.useState('');
    const [bookAuthor, setBookAuthor] = React.useState('');
    const [bookPublisher, setBookPublisher] = React.useState('');
    const [bookDescription, setBookDescription] = React.useState('');
    const [bookId, setBookId] = React.useState('');
    const textColor = useColorModeValue("gray.700", "white");

    useEffect(() => {
        if (currentBook) {
            setBookImage(currentBook.image || defaultImage); 
            setBookId(currentBook.id)
            setBookName(currentBook.name);
            setBookIdCategory(currentBook.category.id);
            setBookNameCategory(currentBook.category.name);
            setBookQuantity(currentBook.quantity);
            setBookPosition(currentBook.position);
            setBookAuthor(currentBook.author);
            setBookPublisher(currentBook.publisher);
            setBookDescription(currentBook.description);

        } 
    }, [currentBook, isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{'Chi tiết sách'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction='column'>
                    <Flex width='100%' justifyContent='center'>
                    <Box
                    borderRadius='15px' 
                    overflow='hidden' 
                    border='1px'
                    borderColor='gray.200' 
                    mb='28px'
                    >
                        <Image 
                        boxSize="250px" 
                        src={bookImage} 
                        objectFit='cover' 
                        borderRadius="12px" 
                        
                    />
                    </Box>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                        Mã sách:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.500' fontWeight='600'>
                        {bookId}
                    </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                        Danh mục:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.500' fontWeight='600'>
                        {bookNameCategory}
                    </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                        Tên sách:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.500' fontWeight='600'>
                        {bookName}
                    </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                        Vị trí:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.500' fontWeight='600'>
                        {bookPosition}
                    </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                        Tác giả:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.500' fontWeight='600'>
                        {bookAuthor}
                    </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                        Nhà xuất bản:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.500' fontWeight='600'>
                        {bookPublisher}
                    </Text>
                    </Flex>
                    <Flex align='center' mb='18px'>
                        <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
                        Mô tả:{" "}
                        </Text>
                        <Text fontSize='md' color='gray.500' fontWeight='600'>
                        {bookDescription}
                    </Text>
                    </Flex>
                    </Flex>
            
                </ModalBody>

                <ModalFooter>
                    <Flex justifyContent='center' width='100%'>
                        <Button 
                            colorScheme='teal'
                            borderColor='teal'
                            color='teal'
                            variant='outline'
                            p='8px 20px'
                            mr='32px'
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button colorScheme="teal">
                            Mượn sách
                        </Button>
                    </Flex>
                </ModalFooter>

            </ModalContent>
        </Modal>
    );
};

export default DetailBook;
