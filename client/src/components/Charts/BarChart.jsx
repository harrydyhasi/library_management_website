import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
  const categories = data.map((item) => item._id);
  const counts = data.map((item) => item.count);

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Loại sách",
        style: { fontSize: "14px", fontWeight: "bold", color: "#333" },
      },
      labels: { style: { fontSize: "12px", colors: "#666" } },
    },
    yaxis: {
      title: {
        text: "Số lượng sách",
        style: { fontSize: "14px", fontWeight: "bold", color: "#333" },
      },
      labels: { style: { fontSize: "12px", colors: "#666" } },
    },
    title: {
      text: "Thống kê số lượng sách theo danh mục",
      align: "center",
      style: { fontSize: "20px", fontWeight: "bold", color: "#319795" },
    },
    grid: {
      borderColor: "#e5e5e5",
      strokeDashArray: 4,
    },
    colors: ["#81E6D9"], // Teal color for bars
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        barHeight: "70%",
        distributed: true,
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value) => `${value} books`,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -10,
      style: {
        fontSize: "12px",
        colors: ["#333"],
        fontWeight: "bold",
      },
      formatter: (val) => val.toLocaleString(),
    },
    legend: { show: false },
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
      height="400px"
    />
  );
};

export default BarChart;
