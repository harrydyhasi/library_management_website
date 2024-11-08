import React, { useState, useEffect } from "react";
import {
  Flex,
  Grid,
  SimpleGrid,
  useColorModeValue,
  Box,
} from "@chakra-ui/react"; // Added Box here
import BarChart from "../../../components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
// Import the new PieChart component
import PieChart from "./components/PieChart"; // Adjust the import path as necessary
import MiniStatistics from "./components/MiniStatistics.jsx";
import ActiveUsers from "./components/ActiveUsers.jsx";
import SalesOverview from "./components/SalesOverview.jsx";
import {
  WalletIcon,
  GlobeIcon,
  DocumentIcon,
  CartIcon,
} from "../../../components/Icons/Icons";

export default function Dashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [booksPerCategory, setBooksPerCategory] = useState([]);
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);
  const [totalBorrows, setTotalBorrows] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Fetch total books
    fetch("http://localhost:3000/api/statistics/total-books")
      .then((response) => response.json())
      .then((data) => setTotalBooks(data.totalBooks));

    // Fetch books per category
    fetch("http://localhost:3000/api/statistics/books-per-category")
      .then((response) => response.json())
      .then((data) => setBooksPerCategory(data.booksPerCategory));

    // Fetch most borrowed books
    fetch("http://localhost:3000/api/statistics/most-borrowed-books")
      .then((response) => response.json())
      .then((data) => setMostBorrowedBooks(data.mostBorrowedBooks));

    // Fetch total borrows in quarter
    fetch("http://localhost:3000/api/statistics/total-borrows-in-quarter")
      .then((response) => response.json())
      .then((data) => setTotalBorrows(data.totalBorrows));

    // Fetch total returns
    fetch("http://localhost:3000/api/statistics/total-returns")
      .then((response) => response.json())
      .then((data) => setTotalReturns(data.totalReturns));

    // Fetch total users
    fetch("http://localhost:3000/api/statistics/total-users")
      .then((response) => response.json())
      .then((data) => setTotalUsers(data.totalUsers));
  }, []);

  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <MiniStatistics
          title={"Total Books"}
          amount={totalBooks}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total Users"}
          amount={totalUsers}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total Borrows"}
          amount={totalBorrows}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total Returns"}
          amount={totalReturns}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>

      <Grid
        mt={"26px"}
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        gap="24px"
        mb={{ lg: "26px" }}
      >
        <ActiveUsers chart={<BarChart data={booksPerCategory} />} />
        {/* <SalesOverview
          // title={"Sales Overview"}
          chart={<LineChart data={mostBorrowedBooks} />} */}
        {/* /> */}
        <Box w="100%">
          <PieChart data={mostBorrowedBooks} />
        </Box>
      </Grid>
    </Flex>
  );
}
