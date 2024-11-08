import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const PieChart = ({ data }) => {
  const [chartData, setChartData] = useState({ labels: [], series: [] });

  useEffect(() => {
    const labels = data.map((item) => item._id);
    const series = data.map((item) => item.count);
    setChartData({ labels, series });
  }, [data]);

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: chartData.labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <Box w="100%" h="300px" textAlign="center">
      <Text fontSize="lg" fontWeight="bold" mb="20px">
        Số lượng tài khoản theo phân quyền
      </Text>
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="pie"
        width="100%"
        height="100%"
      />
    </Box>
  );
};

export default PieChart;
