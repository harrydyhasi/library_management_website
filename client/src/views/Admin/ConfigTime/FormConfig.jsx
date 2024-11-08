import React, { useState, useEffect } from "react";
import { 
  Flex, 
  FormControl, 
  FormLabel, 
  InputGroup, 
  InputLeftAddon, 
  NumberInput, 
  NumberInputField, 
  Button, 
  Spacer,
  NumberInputStepper ,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";

import { useDispatch, useSelector } from 'react-redux';
import { fetchConfig, updateConfig, selectConfig, selectLoading, selectError } from '../../../redux/reducers/configReducer'; // Adjust the import path as necessary
import Card from "components/Card/Card";

function FormConfig() {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);

  const [borrowDuration, setBorrowDuration] = useState(0);
  const [maxBooks, setMaxBooks] = useState(0);
  const [dailyFine, setDailyFine] = useState(0.0);
  const [isEditable, setIsEditable] = useState(false); // Control read-only state

  // Fetch the configuration when the component mounts
  useEffect(() => {
    dispatch(fetchConfig());
  }, [dispatch]);

  // Update local state when config is fetched
  useEffect(() => {
    if (config) {
      setBorrowDuration(config.maxBorrowDays);
      setMaxBooks(config.maxBorrowBooks);
      setDailyFine(config.dailyFine);
    }
  }, [config]);


  const handleUpdate = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
    // Save the updated config
    dispatch(updateConfig({ 
      _id: config._id,
      maxBorrowDays: borrowDuration, 
      maxBorrowBooks: maxBooks, 
      dailyFine: dailyFine 
    }));
  };

  const handleCancel = () => {
    setIsEditable(false);

    // Reset fields to original values
    if (config) {
      setBorrowDuration(config.maxBorrowDays);
      setMaxBooks(config.maxBorrowBooks);
      setDailyFine(config.dailyFine);
    }
  };
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <Flex direction='column' w='50%' p='12px 0px 22px 20px'>
            {/* Thời hạn mượn sách tối đa */}
            <FormControl mb="4" isRequired>
                <FormLabel>Thời hạn mượn sách tối đa (ngày)</FormLabel>
                <NumberInput 
                value={borrowDuration} 
                min={0} 
                isReadOnly={!isEditable}
                onChange={(valueString) => setBorrowDuration(Number(valueString))}
                >
                <NumberInputField placeholder="Nhập số ngày tối đa" />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput>
            </FormControl>

            {/* Số lượng sách mượn tối đa */}
            <FormControl mb="4" isRequired>
                <FormLabel>Số lượng sách mượn tối đa</FormLabel>
                <NumberInput 
                value={maxBooks} 
                min={0} 
                isReadOnly={!isEditable}
                onChange={(valueString) => setMaxBooks(Number(valueString))}
                >
                <NumberInputField placeholder="Nhập số lượng tối đa" />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
                </NumberInput>
            </FormControl>

            {/* Phí phạt mỗi ngày */}
            <FormControl mb="4" isRequired>
                <FormLabel>Phí phạt mỗi ngày</FormLabel>
                <InputGroup>
                <InputLeftAddon children="₫" />
                <NumberInput 
                    value={dailyFine} 
                    precision={2} 
                    step={0.01} 
                    min={0} 
                    isReadOnly={!isEditable}
                    onChange={(valueString) => setDailyFine(parseFloat(valueString))}
                >
                    <NumberInputField placeholder="Nhập phí phạt mỗi ngày" />
                    
                </NumberInput>
                </InputGroup>
            </FormControl>

            {/* Chỉnh sửa, Lưu, Hủy */}
            <Flex mt="4">
                {isEditable ? (
                <>
                    <Button colorScheme="blue" onClick={handleSave}>
                    Lưu
                    </Button>
                    
                    <Button variant="outline" onClick={handleCancel} ml="2">
                    Hủy
                    </Button>
                </>
                ) : (
                <Button colorScheme="teal" onClick={handleUpdate}>
                    Chỉnh sửa
                </Button>
                )}
            </Flex>
        </Flex>
    </Card>
  );

  
}

export default FormConfig;
