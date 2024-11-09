import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,  
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Flex,
  Text,
  useToast,
  Box,
  IconButton,
  FormErrorMessage,
  useDisclosure, // Import useDisclosure here
} from "@chakra-ui/react";
import { formatDateToYYYYMMDD, formatWithThousandsSeparator } from '../../../../utils/formatters/date';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBorrowSlip } from '../../../../redux/reducers/borrowSlipReducer';
import DeleteConfirmationDialog from '../../../Manager/BorrowSlipManagement/components/DeleteConfirmationDialog';
import CustomToast from '../../../../components/Toast/CustomToast';

const HistoryModal = ({ 
  isOpen, 
  onClose, 
  initialData, // for editing
}) => {
  const dispatch = useDispatch();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const [formData, setFormData] = useState({
    _id: '',
    borrowed_date: '', 
    return_date: '', 
    status: '',
    user_id: '', 
    manager_id: '',
    manager_name: '',
    books: [] // Add a field for borrowed books
  });
  const { showToast } = CustomToast();

  const handleDeleteConfirm = () => {
    try {
      dispatch(deleteBorrowSlip(formData._id));
      showToast({ title: "Xóa phiếu mượn thành công!", status: "success" });
  } catch (error) {
      showToast({ title: "Xóa phiếu mượn thất bại!", status: "error" });
  } finally {
      onCloseDelete();
    }
  };

  useEffect(() => {
      setFormData({
        _id: initialData._id || '',
        borrowed_date: formatDateToYYYYMMDD(initialData.borrowed_date) || '',
        return_date: formatDateToYYYYMMDD(initialData.return_date) || '',
        status: initialData.status || '',
        user_id: initialData.user_id || '',
        manager_id: initialData.manager_id || '',
        manager_name: initialData.manager_name || '',
        books: initialData.books || [], // Initialize borrowed books
      });
  }, [initialData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}
      isCentered
      motionPreset='slideInBottom'
      size='xl'
      scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"Chi tiết phiếu mượn"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* ID */}
          <FormControl mb="4">
              <FormLabel>Mã phiếu mượn</FormLabel>
              <Input
                name="_id"
                value={formData._id}
                readOnly 
              />
            </FormControl>
            {/* Borrowed Date */}
            <FormControl mb="4" isRequired>
              <FormLabel>Ngày đăng ký/Ngày mượn</FormLabel>
              <Input
                type="date"
                name="borrowed_date"
                value={formData.borrowed_date}
                readOnly
              />
            </FormControl>
            {/* Return Date */}
            <FormControl mb="4" isRequired >
              <FormLabel>Ngày trả</FormLabel>
              <Input
                type="date"
                name="return_date"
                value={formData.return_date}
                readOnly
              />
            </FormControl>
            {/* Status */}
            <FormControl mb="4" isRequired>
              <FormLabel>Tình trạng</FormLabel>
              <Select
                disabled
                readOnly
                name="status"
                value={formData.status}
              >
                <option value="registered">Đã đăng ký</option>
                <option value="borrowed">Đang mượn</option>
                <option value="returned">Đã trả</option>  
              </Select>
            </FormControl>
            
            {/* Borrowed Books Section */}
            <FormControl mb="4">
              <FormLabel>Danh sách mượn</FormLabel>
              {formData.books.map((book, index) => (
                <Box key={index} borderWidth="1px" borderRadius="lg" p="4" mb="2">
                  <Flex mb="2">
                    <FormControl flex="1" mr="2" isRequired>
                      <FormLabel htmlFor={`book-title-${index}`}>Mã sách</FormLabel>
                      <Flex>
                      <Input
                        id={`book-${index}`}
                        value={book}
                        readOnly
                      />
                  </Flex>
                    </FormControl>
                  </Flex>
                </Box>
              ))}
            </FormControl>
            {formData.status === "registered" && (
              <Flex justifyContent='center'>
                <Button
                colorScheme='red'
                borderColor='red.400'
                color='red.400'
                variant='outline'
                ml={4}
                p='8px 20px'
                onClick={onOpenDelete} // Open delete confirmation dialog
              >
              Xóa phiếu mượn
              </Button>
              </Flex>
            )}
            <ModalFooter>
            </ModalFooter>
            <DeleteConfirmationDialog
              isOpen={isOpenDelete} // Pass delete dialog open state
              onClose={onCloseDelete} // Close delete dialog on cancel
              title="Xóa phiếu mượn này"
              message="Bạn có chắc muốn xóa phiếu mượn này."
              onConfirm={handleDeleteConfirm}
            />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HistoryModal;
