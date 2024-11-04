import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Grid, useColorModeValue, Text } from '@chakra-ui/react';
import avatar4 from '../../../assets/img/avatars/avatar4.png';
import ProfileBgImage from '../../../assets/img/ProfileBackground.png';
import { FaCube, FaPenFancy } from 'react-icons/fa';
import { IoDocumentsSharp } from 'react-icons/io5';
import Conversations from "./components/Conversations";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";
import Projects from "./components/Projects";

import { fetchUser } from '../../../redux/actions/user_action';

function Profile() {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.user);
  const { user: loggedInUser } = useSelector((state) => state.auth); 
  // Fetch user details if loggedInUser is available
  useEffect(() => {
    if (loggedInUser && loggedInUser.id) {
      dispatch(fetchUser(loggedInUser.id));
    }
  }, [dispatch, loggedInUser, user.fullName]);

  const bgProfile = useColorModeValue(
    'hsla(0,0%,100%,.8)',
    'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)'
  );

  return (
    <Flex direction="column">
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        avatarImage={avatar4}
        name={loading ? 'Loading...' : user?.fullName || 'Unknown username'}
        email={loading ? 'Loading...' : user?.email || 'unknown@example.com'}
        tabs={[
          { name: 'OVERVIEW', icon: <FaCube w="100%" h="100%" /> },
          { name: 'TEAMS', icon: <IoDocumentsSharp w="100%" h="100%" /> },
          { name: 'PROJECTS', icon: <FaPenFancy w="100%" h="100%" /> },
        ]}
      />
      {loading ? (
        <Text>Loading...</Text> 
      ) : error ? (
        <Text color="red.500">{error}</Text> 
      ) : (
        <Grid templateColumns={{ sm: '1fr', xl: 'repeat(3, 1fr)' }} gap="22px">
          <PlatformSettings
            title={'Platform Settings'}
            subtitle1={'ACCOUNT'}
            subtitle2={'APPLICATION'}
          />
          <ProfileInformation
            title={'Profile Information'}
            description={user.description || 'Default description...'}
            name={user.name || 'Esthera Jackson'}
            mobile={user.phone || '(44) 123 1234 123'}
            email={user.email || 'unknown@example.com'}
            location={user.location || 'United States'}
          />
          <Conversations title={'Conversations'} />
        </Grid>
      )}
      <Projects title={'Projects'} description={'Architects design houses'} />
    </Flex>
  );
}

export default Profile;
