import { Flex, Heading } from "@chakra-ui/react";

const NotFound = () => (
  <Flex direction="column" align="center" justify="center" height="100vh">
    <Heading as="h1">404 - Page Not Found</Heading>
    <p>The page you are looking for does not exist.</p>
  </Flex>
);

export default NotFound;
