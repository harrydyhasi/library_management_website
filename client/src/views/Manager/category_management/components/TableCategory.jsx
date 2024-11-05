import {
  Td,
  Text,
  Tr,
  Flex,
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import { deleteCategory } from '../../../../redux/actions/category_action'; 
import CustomToast from '../../../../components/Toast/CustomToast';
import { useDispatch, useSelector } from 'react-redux';

function TableCategory({ id, name, onEdit }) {
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { showToast } = CustomToast();
  const iconColor = useColorModeValue("gray", "white");

  const books = useSelector((state) => state.book.books); 
  const handleDelete = () => {
    const hasBooksInCategory = books.some(book => book.category_id.id === id);

    if (hasBooksInCategory) {
      showToast({ title: "Không thể xóa danh mục này vì có sách thuộc danh mục!", status: "error" });
      onClose();
      return;
    }

    dispatch(deleteCategory(id));
    showToast({ title: "Xóa danh mục thành công!", status: "success" });
    onClose();
  };

  return (
    <Tr>
      <Td align="center" minWidth={{ sm: "150px" }} pl="0px">
        <Flex justifyContent="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {id}
          </Text>
        </Flex>
      </Td>
      <Td align="center" minWidth={{ sm: "150px" }} pl="0px">
        <Flex justifyContent="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex justifyContent="flex-end">
          <Button 
            p="0px" 
            bg="transparent" 
            mb={{ sm: "10px", md: "0px" }} 
            me={{ md: "12px" }} 
            onClick={() => onEdit({ id, name })} 
          >
            <Flex color={iconColor} cursor="pointer" align="center" p="12px">
              <TbEdit size='20px' />
            </Flex>
          </Button>

          <Button p="0px" marginLeft='40px' bg="transparent" onClick={onOpen}>
            <Flex color="red.400" cursor="pointer" align="center" p="12px">
              <MdDeleteOutline size='21px' />
            </Flex>
          </Button>
        </Flex>
        <ConfirmDialog 
          isOpen={isOpen} 
          onClose={onClose} 
          onConfirm={handleDelete} 
          message="Bạn có chắc chắn muốn xóa danh mục này không?" 
        />
      </Td>
    </Tr>
  );
}

export default TableCategory;
