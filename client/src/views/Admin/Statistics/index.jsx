import React, { useEffect, useState } from "react";
import { Flex, Box, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import PieChart from "./components/PieChart";

function Statistics() {
  const [userCountByRole, setUserCountByRole] = useState([]);
  const [isLoading, setIsLoading] = useState({
    books: false,
    categories: false,
    borrowslips: false,
    users: false,
  });
  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:3000/api/statistics/user-count-by-role")
      .then((response) => response.json())
      .then((data) => setUserCountByRole(data.userCountByRole))
      .catch((error) => {
        toast({
          title: "Error fetching data",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleExport = async (type) => {
    setIsLoading((prev) => ({ ...prev, [type]: true }));
    try {
      const response = await fetch(
        `http://localhost:3000/api/statistics/export-${type}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to export ${type}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${type}.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `${type} data has been exported successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} px={6}>
      <Box w="100%" mb={8}>
        <PieChart
          data={userCountByRole}
          title="Thống kê người dùng theo phân quyền"
        />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        <Button
          colorScheme="blue"
          onClick={() => handleExport("books")}
          isLoading={isLoading.books}
          loadingText="Đang xuất..."
        >
          Xuất danh sách sách
        </Button>

        <Button
          colorScheme="green"
          onClick={() => handleExport("categories")}
          isLoading={isLoading.categories}
          loadingText="Đang xuất..."
        >
          Xuất danh sách danh mục
        </Button>

        <Button
          colorScheme="purple"
          onClick={() => handleExport("borrowslips")}
          isLoading={isLoading.borrowslips}
          loadingText="Đang xuất..."
        >
          Xuất phiếu mượn
        </Button>

        <Button
          colorScheme="orange"
          onClick={() => handleExport("users")}
          isLoading={isLoading.users}
          loadingText="Đang xuất..."
        >
          Xuất danh sách người dùng
        </Button>
      </SimpleGrid>
    </Flex>
  );
}

export default Statistics;
