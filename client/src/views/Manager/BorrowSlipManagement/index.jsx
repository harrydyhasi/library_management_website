// Chakra imports
import {
  Flex,
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import BorrowSlipList from "./components/BorrowSlipList";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBorrowSlips } from '../../../redux/reducers/borrowSlipReducer';


export default function BorrowSlipManagement() {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.borrowSlips);

    useEffect(() => {
      dispatch(fetchBorrowSlips()); 
    }, [dispatch]);

    return (
      <>
      <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
        <BorrowSlipList
          title={"Danh sách phiếu mượn"}
          captions={["Mã phiếu mượn",  "Ngày mượn", "Ngày trả", "Tình Trạng", ""]}
          data={list}
        />
        
      </Flex>
    </>
    );
  }

