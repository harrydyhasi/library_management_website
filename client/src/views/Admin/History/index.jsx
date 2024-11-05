// Chakra imports
import { Flex } from "@chakra-ui/react";
import BorrowHistory from "./components/BorrowHistory";
import Books from "./components/Books";
import { booksTableData, borrowHistoryData } from "../../../variables/general";

function Tables() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Borrow History Table */}
      <BorrowHistory
        title={"Lịch sử mượn sách"}  // "Borrow History" in Vietnamese
        captions={["Tên Sách", "Thể Loại","Trạng Thái", "Ngày mượn"]}  // Adjusted captions for books
        data={borrowHistoryData}  // Borrow history data
      />
      {/* Books Table */}
      <Books
        title={"Danh sách sách"}  // "Books List" in Vietnamese
        captions={["Tên Sách", "Tác Giả", "Thể Loại", "Nhà Xuất Bản", "Tình Trạng", "Ngày Xuất Bản", ""]}  // Adjusted captions for books
        data={booksTableData}  // Books data
      />
    </Flex>
  );
}

export default Tables;