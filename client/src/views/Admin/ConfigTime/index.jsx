import { Flex } from '@chakra-ui/react';
import FormConfig from './FormConfig'
function ConfigTime() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <FormConfig/>
    </Flex>
  );
}

export default ConfigTime;
