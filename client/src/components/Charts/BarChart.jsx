import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
  const categories = data.map((item) => item._id);
  const counts = data.map((item) => item.count);

  const options = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: categories,
    },
    title: {
      text: "Số lượng sách theo loại",
    },
  };

  const series = [
    {
      name: "Books",
      data: counts,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default BarChart;
