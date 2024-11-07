// Chakra imports
import { Flex } from "@chakra-ui/react";
import History from "./components/HistoryList";
import { tablesTableData, dashboardTableData, borrowHistoryData } from "../../../variables/general";
import {useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
// import { fetchBorrowSlips } from '../../../redux/reducers/borrowSlipReducer';
import { fetchBorrowSlips, fetchBorrowSlipsByUserId } from '../../../redux/reducers/borrowSlipReducer';

function Tables() {
  const dispatch = useDispatch();
  const {user: loggedInUser } = useSelector((state) => state.auth);
  // const [list, loading, error] = useSelector((state) => state.studentBorrowList);

  const { list, loading, error } = useSelector((state) => state.borrowSlips);

  // useEffect(() => {
  //   dispatch(fetchBorrowSlips()); 
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBorrowSlipsByUserId(loggedInUser.id)); 
  }, [dispatch]);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <History
        title={"Lịch sử mượn trả sách"}
        captions={["Mã phiếu mượn", "Ngày mượn", "Tình trạng", "Ngày trả", ""]}
        data={list}
      />
    </Flex>
  );
}

export default Tables;
