import React from "react";
import {
  Avatar,
  Td,
  Text,
  Tr,
  Flex,
  Button,
  useColorModeValue,
  useDisclosure,
  
} from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import { deleteBook } from '../../../../redux/actions/book_action'; 
import { useDispatch } from 'react-redux';
import CustomToast from '../../../../components/Toast/CustomToast';
import defaultImage from '/images/image.png?url';

function TableBook({ id, name, quantity, position, author, publisher, description, category, image, pdf, onEdit }) { 
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { showToast } = CustomToast();
  const iconColor = useColorModeValue("gray", "white");


  const handleDelete = async () => {
    try {
      await dispatch(deleteBook(id));
      showToast({
        title: "Xóa danh mục thành công!",
        status: "success",
      });
    } catch (error) {
      showToast({
        title: "Xóa danh mục thất bại!",
        status: "error",
      });
    } finally {
      onClose();
    }
  };

  return (
    <Tr>
      <Td pl="0px">
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
        <Avatar 
          src={image ? `${image}` : defaultImage} 
          w="60px" 
          h="60px"
          borderRadius="12px" 
          me="18px" 
          objectFit="fill"
        />
        </Flex>
      </Td>
      <Td pl="0px"  minWidth={{ sm: "100px" }}>
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {id}
          </Text>
        </Flex>
      </Td>
      <Td pl="0px">
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
        
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td pl="0px">
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {category.id}
          </Text>
        </Flex>
      </Td>
      <Td pl="0px">
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {quantity}
          </Text>
        </Flex>
      </Td>
      <Td pl="0px">
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {position}
          </Text>
        </Flex>
      </Td>
      <Td pl="0px">
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {author}
          </Text>
        </Flex>
      </Td>
      <Td pl="0px">
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {publisher}
          </Text>
        </Flex>
      </Td>
      <Td pl="0px">
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
            {description}
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
            onClick={() => onEdit({ id, name, quantity, position, author, publisher, description, category, image, pdf })} 
          >
            <Flex color={iconColor} cursor="pointer" align="center" p="12px">
              <TbEdit size='20px' />
            </Flex>
          </Button>

          <Button p="0px" bg="transparent" onClick={onOpen}>
            <Flex color="red.400" cursor="pointer" align="center" p="12px">
              <MdDeleteOutline size='21px' />
            </Flex>
          </Button>
        </Flex>
        <ConfirmDialog 
          isOpen={isOpen} 
          onClose={onClose} 
          onConfirm={handleDelete} 
          message="Bạn có chắc chắn muốn xóa sách này không?" 
        />
      </Td>
    </Tr>
  );
}

export default TableBook;
