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
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
  Image,
  InputGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, updateBook } from '../../../../redux/actions/book_action';
import CustomToast from '../../../../components/Toast/CustomToast';

const AddBook = ({ isOpen, onClose, currentBook }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [bookName, setBookName] = React.useState('');
  const [bookCategory, setBookCategory] = React.useState('');
  const [bookQuantity, setBookQuantity] = React.useState('');
  const [bookPosition, setBookPosition] = React.useState('');
  const [bookAuthor, setBookAuthor] = React.useState('');
  const [bookPublisher, setBookPublisher] = React.useState('');
  const [bookDescription, setBookDescription] = React.useState('');
  const [bookImage, setBookImage] = React.useState(null);
  const [bookPdf, setBookPdf] = React.useState(null);
  const [error, setError] = React.useState('');
  const { showToast } = CustomToast();

  const clearForm = () => {
    setBookName('');
    setBookCategory('');
    setBookQuantity('');
    setBookPosition('');
    setBookAuthor('');
    setBookPublisher('');
    setBookDescription('');
    setBookImage(null);
    setBookPdf(null);
  };

  const handleAddBook = async (categoryId) => {
    const formData = new FormData();
    formData.append('name', bookName);
    formData.append('category_id', categoryId);
    formData.append('quantity', bookQuantity);
    formData.append('position', bookPosition);
    formData.append('author', bookAuthor);
    formData.append('publisher', bookPublisher);
    formData.append('description', bookDescription);

    if (bookImage) {
      formData.append('image', bookImage);
    }

    if (bookPdf) {
      formData.append('pdf', bookPdf);
    }

    try {
      await dispatch(createBook(formData));
      showToast({ title: "Thêm sách thành công!", status: "success" });
    } catch (error) {
      showToast({ title: "Thêm sách thất bại!", status: "error" });
    } finally {
      onClose();
    }
  };

  const handleUpdateBook = async (categoryId) => {
    if (!currentBook) {
      console.error("currentBook is undefined");
      return;
    }

    const formData = new FormData();
    formData.append('category_id', categoryId);
    formData.append('name', bookName);
    formData.append('quantity', bookQuantity);
    formData.append('position', bookPosition);
    formData.append('author', bookAuthor);
    formData.append('publisher', bookPublisher);
    formData.append('description', bookDescription);

    if (bookImage) {
      formData.append('image', bookImage);
    }

    if (bookPdf) {
      formData.append('pdf', bookPdf);
    }

    try {
      await dispatch(updateBook(currentBook.id, formData));
      showToast({ title: "Cập nhật sách thành công!", status: "success" });
    } catch (error) {
      showToast({ title: "Cập nhật sách thất bại!", status: "error" });
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (currentBook) {
      setBookName(currentBook.name);
      setBookCategory(currentBook.category._id);
      setBookQuantity(currentBook.quantity);
      setBookPosition(currentBook.position);
      setBookAuthor(currentBook.author);
      setBookPublisher(currentBook.publisher);
      setBookDescription(currentBook.description);
      setBookImage(currentBook.image); 
      setBookPdf(currentBook.pdf); // Set the PDF value
      setError('');
    } else {
      clearForm();
      setError('');
    }
  }, [currentBook, isOpen]);

  const handleSubmit = () => {
    if (!bookName || !bookCategory || !bookQuantity || !bookPosition || !bookAuthor || !bookPublisher || !bookDescription) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const selectedCategory = categories.find((cat) => cat._id === bookCategory);
    const categoryIdToSend = selectedCategory ? selectedCategory.id : bookCategory;

    if (currentBook) {
      handleUpdateBook(categoryIdToSend);
    } else {
      handleAddBook(categoryIdToSend);
    }

    clearForm();
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (validImageTypes.includes(file.type) && file.size <= 5 * 1024 * 1024) {
        setBookImage(file);
        showToast({ title: "Tải lên hình ảnh thành công!", status: "success" });
      } else {
        setError('Vui lòng chọn hình ảnh hợp lệ (JPEG, PNG, GIF) và kích thước không quá 5MB.');
      }
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validPdfTypes = ['application/pdf'];
      if (validPdfTypes.includes(file.type)) {
        setBookPdf(file);
        showToast({ title: "Tải lên PDF thành công!", status: "success" });
      } else {
        setError('Vui lòng chọn file PDF hợp lệ.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{currentBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={4}>
              <FormLabel>Hình ảnh</FormLabel>
              {bookImage && (
                  <Flex justifyContent='center' width='100%'>
                      <Image 
                          src={typeof bookImage === 'string' ? bookImage : URL.createObjectURL(bookImage)} 
                          alt="Preview" 
                          mt={4} 
                          boxSize="250px" 
                          objectFit="cover" 
                          border="1px" 
                          borderColor="gray.200"
                          borderRadius="12px" 
                          mb={4}
                      />
                  </Flex>
              )}
              <InputGroup>
                  <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      display="none" 
                      id="file-upload" 
                  />
                  <Flex direction="column" alignItems="center" justifyContent='center' width='100%'>
                      <Button 
                          as="label" 
                          htmlFor="file-upload" 
                          colorScheme='teal'
                          borderColor='teal'
                          color='teal'
                          variant='outline'
                          p='8px 20px'>
                          Chọn ảnh
                      </Button>
                      {bookImage && (
                          <Text mt={4} textAlign="center">
                              {bookImage.name} 
                          </Text>
                      )}
                  </Flex>
              </InputGroup>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>File PDF</FormLabel>
            <Input 
                type="file" 
                accept="application/pdf" 
                onChange={handlePdfChange} 
                display="none" 
                id="pdf-upload" 
            />
            <Flex width='100%'>
                <Button 
                    as="label" 
                    htmlFor="pdf-upload" 
                    colorScheme='teal'
                    borderColor='teal'
                    color='teal'
                    variant='outline'
                    p='8px 20px'
                    mr={4}
                   >
                    Chọn PDF
                </Button>
                {bookPdf && (
                    <Text mt={2} textAlign="center">
                        {bookPdf.name}
                    </Text>
                )}
            </Flex>
            {currentBook && currentBook.pdf && (
            <Flex mb={4} mt={4} alignItems="center">
                <Text mr={2}>Tệp PDF hiện có:</Text>
                <Text 
                    as="span" 
                    color="blue.500" 
                    cursor="pointer" 
                    textDecoration="underline" 
                    onClick={() => window.open(currentBook.pdf, '_blank')}
                >
                    {currentBook.name}.pdf
                </Text>
            </Flex>
        )}

          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Tên sách</FormLabel>
            <Input
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Nhập tên sách"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Danh mục</FormLabel>
            <Select
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
              placeholder="Chọn danh mục"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Số lượng</FormLabel>
            <NumberInput 
              value={bookQuantity} 
              onChange={(valueString) => setBookQuantity(valueString)}
            >
              <NumberInputField placeholder="Nhập số lượng" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Vị trí</FormLabel>
            <Input
              value={bookPosition}
              onChange={(e) => setBookPosition(e.target.value)}
              placeholder="Nhập vị trí"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Tác giả</FormLabel>
            <Input
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              placeholder="Nhập tên tác giả"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Nhà xuất bản</FormLabel>
            <Input
              value={bookPublisher}
              onChange={(e) => setBookPublisher(e.target.value)}
              placeholder="Nhập tên nhà xuất bản"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Mô tả</FormLabel>
            <Input
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
              placeholder="Nhập mô tả"
            />
          </FormControl>

          {error && <Text color="red.500">{error}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='teal.500'
            borderColor='teal.500'
            color='teal.500'
            variant='outline'
            p='8px 20px'
            mr='28px' onClick={onClose} >
            Hủy
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            {currentBook ? 'Cập nhật' : 'Thêm'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBook;
