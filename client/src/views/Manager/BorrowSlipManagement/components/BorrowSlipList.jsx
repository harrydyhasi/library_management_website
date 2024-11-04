// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  Flex,
  Button,
  Icon
} from "@chakra-ui/react";
import { FaPencilAlt } from "react-icons/fa";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import BorrowSlipRow from "./BorrowSlipRow";
import BorrowSlipModal from './BorrowSlipModal';

import { useDispatch } from 'react-redux';
import { addBorrowSlip, fetchBorrowSlips } from '../../../../redux/reducers/borrowSlipReducer';



const BorrowSlipList = ({ title, captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  
   // Modal state
   const { isOpen, onOpen, onClose } = useDisclosure();

   const dispatch = useDispatch();

   // Handler to be called on form submission
   const handleAdd = async (data) => {
      await dispatch(addBorrowSlip(data));
      console.log('Adding New Borrow Slip:', data);
  };
  return (
    <>
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px'>
      <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Button colorScheme="green" background= "green.400"  ml={4} onClick={onOpen}>
              <Text fontSize='sm' color="white" fontWeight='bold'>
            Thêm phiếu mượn
          </Text>
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant='simple' color={textColor}>
          <Thead>
            <Tr my='.8rem' pl='0px' color='gray.400'>
              {captions.map((caption, idx) => {
                return (
                  <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => {
              return (
                <BorrowSlipRow
                  key={row._id}
                  _id = {row._id}
                  user_id={row.user_id}
                  borrowed_date = {row.borrowed_date}
                  return_date = {row.return_date}
                  status = {row.status}
                  manager_id = {row.manager_id}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>

    <BorrowSlipModal
        isOpen={isOpen}
        onClose={onClose}
        mode="add" // Set to "add" mode
        onSubmit={handleAdd}
      />
      </>
  );
};

export default BorrowSlipList;
