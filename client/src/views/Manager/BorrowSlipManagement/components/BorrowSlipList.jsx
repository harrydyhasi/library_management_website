// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
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

const BorrowSlipList = ({ title, captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px'>
      <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Button colorScheme="green" background= "green.400"  ml={4}>
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
                  key={`${row._id}`}
                  _id = {row._id}
                  user={row.user}
                  borrowed_date = {row.borrowed_date}
                  return_date = {row.return_date}
                  status = {row.status}
                  manager = {row.manager}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default BorrowSlipList;
