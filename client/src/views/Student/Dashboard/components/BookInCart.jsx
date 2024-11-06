// chakra imports
import { Avatar, Flex, Text, useColorModeValue,IconButton } from "@chakra-ui/react";
// import { ClockIcon } from "components/Icons/Icons";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { removeBookFromCart } from '../../../../redux/reducers/bookInCartReducer';

export function ItemBook(props) {
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const notificationColor = useColorModeValue("gray.700", "white");
  const spacing = " ";

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeBookFromCart(props.bookId));
  };
  
  return (
    <>
      <Avatar
        // name={props.aName}
        // src={props.aSrc}
        borderRadius="12px"
        me="16px"
      />
      <Flex flexDirection="column">
        <Text fontSize="14px" mb="5px" color={notificationColor}>
          <Text fontWeight="bold" fontSize="14px" as="span">
            {props.bookId}
            {spacing}
          </Text>
        </Text>
        <Flex alignItems="center">
          {/* <ClockIcon color={navbarIcon} w="13px" h="13px" me="3px" /> */}
          <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
            {props.bookName}
          </Text>
        </Flex>
      </Flex>
      <IconButton ml="2" size='sm'
        icon={<MdDeleteOutline/>}
        colorScheme="red"
        onClick={handleDelete}
        aria-label="Xóa sách"/>
      
      
    </>
  );
}
