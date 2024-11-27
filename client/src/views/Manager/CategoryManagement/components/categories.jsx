import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
  Flex,
  Button,
  InputGroup,
  Text,
  InputLeftElement,
  IconButton,
  Input,
  Alert,
  Spinner,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";
import TableCategory from "./TableCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../redux/actions/category_action";
import { BiSearchAlt } from "react-icons/bi";
import ErrorAlert from "../../../../components/Alert/CustomAlert";
import AddCategoryDialog from "./AddCategory";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const textColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("white", "gray.800");
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  const [isLoadingImport, setIsLoadingImport] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <VStack>
        <Spinner color="teal.600" />
        <Text color="teal.600">Loading...</Text>
      </VStack>
    );
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.id.toString().includes(searchQuery) ||
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    setCurrentCategory(null);
    onOpen();
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    onOpen();
  };

  const handleExport = async () => {
    setIsLoadingExport(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/statistics/export-categories",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export categories");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "categories.xlsx";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Xuất file thành công",
        description: `Xuất danh sách danh mục thành công`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Xuất file thất bại",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoadingExport(false);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn một file để import",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoadingImport(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/category/import",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Import thất bại");
      }

      toast({
        title: "Import thành công",
        description: `File danh mục đã được nhập thành công`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      dispatch(fetchCategories()); // Refresh danh mục sau khi import
    } catch (error) {
      toast({
        title: "Import thất bại",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoadingImport(false);
    }
  };

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader>
        <Flex direction="column" w="100%" p="12px 0px 22px 20px">
          <Flex justifyContent="space-between">
            <Text fontSize="xl" color={textColor} fontWeight="bold" pl="8px">
              Danh mục sách
            </Text>
            <Button
              colorScheme="teal"
              background="teal.300"
              p="8px 20px"
              onClick={handleAddCategory}
            >
              Thêm danh mục mới
            </Button>
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            w="100%"
            mb="10px"
            p="0px"
            my="20px"
          >
            <InputGroup bg={inputBg} borderRadius="15px" w="300px">
              <InputLeftElement>
                <IconButton
                  bg="inherit"
                  borderRadius="inherit"
                  icon={<BiSearchAlt color={searchIconColor} />}
                />
              </InputLeftElement>
              <Input
                fontSize="xs"
                py="11px"
                placeholder="Nhập mã hoặc tên danh mục"
                borderRadius="inherit"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>

            <Flex justifyContent="flex-end" w="100%">
              <Button
                colorScheme="teal.300"
                borderColor="teal.300"
                color="teal.300"
                variant="outline"
                p="8px 20px"
                onClick={handleExport}
                isLoading={isLoadingExport}
                loadingText="Đang xuất..."
              >
                Xuất danh sách danh mục
              </Button>
            </Flex>
            <Flex justifyContent="flex-end" w="100%">
              <Input
                type="file"
                id="import-file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <label htmlFor="import-file">
                <Button
                  as="span"
                  colorScheme="teal.300"
                  borderColor="teal.300"
                  color="teal.300"
                  variant="outline"
                  p="8px 20px"
                  isLoading={isLoadingImport}
                  loadingText="Đang nhập..."
                  onClick={handleImport}
                >
                  Import danh mục
                </Button>
              </label>
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Flex direction="column" w="100%" p="12px 0px 22px 20px">
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th>Mã danh mục</Th>
                <Th>Tên danh mục</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCategories.map((category) => (
                <TableCategory
                  key={category._id}
                  id={category.id}
                  name={category.name}
                  onEdit={handleEditCategory}
                />
              ))}
            </Tbody>
          </Table>
        </Flex>
      </CardBody>
      <AddCategoryDialog
        isOpen={isOpen}
        onClose={() => {
          setCurrentCategory(null); 
          onClose();
        }}
        currentCategory={currentCategory}
      />
    </Card>
  );
};

export default Categories;
