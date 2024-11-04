import { Flex } from '@chakra-ui/react';
import ListBook from "./components/ListBooks";

function Dashboard() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <ListBook title={'Tất cả sách'}/>
    </Flex>
  );
}

export default Dashboard;
