import { useToast } from '@chakra-ui/react';

const CustomToast = () => {
  const toast = useToast();

  const showToast = ({ title, status = 'info', duration = 3000, isClosable = true }) => {
    toast({
      title,
      status,
      duration,
      isClosable,
      position: 'top', 
    });
  };

  return { showToast };
};

export default CustomToast;
