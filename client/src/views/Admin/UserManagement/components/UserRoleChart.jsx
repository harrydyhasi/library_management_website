import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const UserRoleChart = ({ data }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Box p="24px" bg="white" borderRadius="lg" boxShadow="lg">
      <Text fontSize="lg" fontWeight="bold" color={textColor} mb="16px">
        Số lượng tài khoản theo vai trò
      </Text>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
};

export default UserRoleChart;
