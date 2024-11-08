// Chakra imports
import { Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
// Custom icons
import {
  CartIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "../../../../components/Icons/Icons";
import React from "react";
import ChartStatistics from "./ChartStatistics";

const ActiveUsers = ({ title, percentage, chart }) => {
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p="16px">
      <CardBody>
        <Flex direction="column" w="100%">
          {chart}
          <Flex direction="column" mt="24px" mb="36px" alignSelf="flex-start">
            <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
              {title}
            </Text>
            <Text fontSize="md" fontWeight="medium" color="gray.400"></Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ActiveUsers;
