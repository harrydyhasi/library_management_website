import { useEffect, useState } from "react"; 
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../redux/actions/auth_action"; 
import { Redirect, useHistory } from "react-router-dom"; // Import useHistory here
import signInImage from "../../assets/img/signInImage.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); 
  const [accountLocked, setAccountLocked] = useState(false); // New state for locked account

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const dispatch = useDispatch();
  const history = useHistory(); 
  const { loading, signin_error, user } = useSelector((state) => state.auth); 

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Signing in with:", email, password);
    await dispatch(signInUser(email, password));
    
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  };

  useEffect(() => {
    if (user) {
      if (user.status === 'locked') {
        setAccountLocked(true); 
      } else {
        setAccountLocked(false); 
      }
    }
  }, [user]);

  if (user && user.status === 'active') {
    if (user.role === 'admin') {
        return <Redirect to="/admin/dashboard" />;
      } else if (user.role === 'manager') {
        return <Redirect to="/manager/dashboard" />;
      } else if (user.role === 'student') {
        return <Redirect to="/student/dashboard" />;
    }
    
  }

  const handleRedirectToSignUp = () => {
    history.push("/auth/signup"); 
  };

  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>
            <FormControl as="form" onSubmit={handleSignIn}>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Your email address"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                placeholder="Your password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              <FormControl display="flex" alignItems="center">
                <Switch
                  id="remember-login"
                  colorScheme="teal"
                  me="10px"
                  isChecked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)} 
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  ms="1"
                  fontWeight="normal"
                >
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                fontSize="10px"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{ bg: "teal.200" }}
                _active={{ bg: "teal.400" }}
                isLoading={loading} 
              >
                SIGN IN
              </Button>
              {signin_error && <Text color="red.500">{signin_error}</Text>} 
              {accountLocked && <Text color="red.500">Tài khoản của bạn đã bị khóa. Liên hệ quản trị viên để được hỗ trợ.</Text>} {/* Message for locked accounts */}
            </FormControl>
            {/* <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Don&apos;t have an account?
                <Link
                  color={titleColor}
                  as="span"
                  ms="5px"
                  fontWeight="bold"
                  onClick={handleRedirectToSignUp} // Add click handler
                  style={{ cursor: 'pointer' }} // Optional: to indicate it's clickable
                >
                  Sign Up
                </Link>
              </Text>
            </Flex> */}
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
