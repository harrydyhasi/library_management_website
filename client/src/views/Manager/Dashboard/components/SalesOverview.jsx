// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import React from "react";

const SalesOverview = ({ title, percentage, chart }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
      <CardHeader mb="20px" pl="22px">
        <Flex direction="column" alignSelf="flex-start">
          <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
            {title}
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.400"></Text>
        </Flex>
      </CardHeader>
      <Box w="100%" h={{ sm: "300px" }} ps="8px">
        {chart} {/* Render the chart passed as a prop */}
      </Box>
    </Card>
  );
};

export default SalesOverview;
