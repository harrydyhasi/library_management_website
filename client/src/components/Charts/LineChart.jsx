import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ data }) => {
  const bookNames = data.map((item) => item._id);
  const borrowCounts = data.map((item) => item.count);

  const options = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: bookNames,
    },
    title: {
      text: "Most Borrowed Books",
    },
  };

  const series = [
    {
      name: "Borrows",
      data: borrowCounts,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
