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
  Select, // Import Select for dropdown
  Input,
  Icon,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import BorrowSlipRow from "./BorrowSlipRow";
import BorrowSlipModal from './BorrowSlipModal';

import { useDispatch } from 'react-redux';
import { addBorrowSlip } from '../../../../redux/reducers/borrowSlipReducer';
import { useState } from 'react';

const BorrowSlipList = ({ title, captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  
  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // State for selected filter
  const [filter, setFilter] = useState("all"); // "all", "borrowed", "registered", "returned"
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  // Handler to be called on form submission
  const handleAdd = (data) => {
    dispatch(addBorrowSlip(data));
  };

  const handleClickReset = () => {
    setSearchQuery("")
    setFilter("all")
  }

  // Filter data based on selected status
  const filteredData = filter === "all" ? data : data.filter(row => row.status === filter);

  // Filter based on search query
  const searchedData = filteredData.filter(row => row._id.includes(searchQuery));

  // Count statuses
  const statusCounts = data.reduce((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {});



  return (
    <>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
        <Flex direction='column' w='100%'>
        <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              {title}
            </Text>
            <Button colorScheme="green" background="green.400" ml={4} onClick={onOpen}>
              <Text fontSize='sm' color="white" fontWeight='bold'>
                Thêm phiếu mượn
              </Text>
            </Button>
          </Flex>
          <Flex justify='space-between'>
          <Flex>
          <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                placeholder="Tìm kiếm ID phiếu mượn"
                width="250px" // Adjust width as needed
                ml={4} // Optional: Add margin to the left for spacing
              />
            <Select
              onChange={(e) => setFilter(e.target.value)}
              width="200px" 
              ml={4} 
              value={filter}
            >
              <option value="all">Tất cả ({data.length})</option>
              <option value="borrowed">Đang mượn ({statusCounts["borrowed"] || 0})</option>
              <option value="registered">Đã đăng ký ({statusCounts["registered"] || 0})</option>
              <option value="returned">Đã trả ({statusCounts["returned"] || 0})</option>
            </Select>
            <Button colorScheme="green" background="green.400" ml={2}>
              <Flex color="white" cursor="pointer" align="center" p="5px" onClick={handleClickReset}>
                <Icon as={GrPowerReset} me="4px" />     
              </Flex>
            </Button>
          </Flex>
          </Flex>
          
        </Flex>
          
          
        </CardHeader>
        <CardBody>
          <Table variant='simple' color={textColor}>
            <Thead>
              <Tr my='.8rem' pl='0px' color='gray.400'>
                {captions.map((caption, idx) => (
                  <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {searchedData.map((row) => (
                <BorrowSlipRow
                  key={row._id}
                  _id={row._id}
                  user_id={row.user_id}
                  borrowed_date={row.borrowed_date}
                  return_date={row.return_date}
                  status={row.status}
                  manager_id={row.manager_id}
                />
              ))}
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
