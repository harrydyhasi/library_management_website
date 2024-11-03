// Chakra imports
import {
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import BorrowSlipList from "./components/BorrowSlipList";
import Projects from "./components/Projects";
import { borrowSlipData, dashboardTableData } from "../../../variables/general";


export default function BorrowSlipManagement() {
  
    return (
      <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
        <BorrowSlipList
          title={"Danh sách phiếu mượn"}
          // captions={["Mã phiếu mượn", "Tình trạng", "Ngày mượn", "Ngày trả", ""]}
          captions={["Mã phiếu mượn",  "Ngày mượn", "Ngày trả", "Tình Trạng", ""]}
          data={borrowSlipData}
        />

        <Projects
          title={"Projects Table"}
          captions={["Companies", "Budget", "Status", "Completion", ""]}
          data={dashboardTableData}
        />
      </Flex>
    );
  }

