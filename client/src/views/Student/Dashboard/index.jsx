import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Grid, useColorModeValue, Text } from '@chakra-ui/react';
import ListBook from "./components/ListBook";

import { fetchUser } from '../../../redux/actions/user_action';

function Profile() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <ListBook title={'Projects'} description={'Architects design houses'} />
    </Flex>
  );
}

export default Profile;
