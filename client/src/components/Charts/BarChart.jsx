import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
  const categories = data.map((item) => item.name);
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
    colors: ["#81E6D9"],
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        barHeight: "70%",
        distributed: true,
        columnWidth: "40%", // Adjust this value to control bar width
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => `${value} quyển`, // Tooltip text in Vietnamese
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
      name: "Số lượng sách",
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
