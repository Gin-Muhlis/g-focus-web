"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { weeklyCompletion } from "@/lib/dashboard-data";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartText = "#A4ADC1";
const grid = "rgba(255,255,255,0.06)";

export function ProductivityChart() {
  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "inherit",
    },
    colors: ["#579DFF", "#4DE2D1"],
    dataLabels: { enabled: false },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.38, opacityTo: 0.02, stops: [0, 95] },
    },
    grid: {
      borderColor: grid,
      strokeDashArray: 4,
      padding: { left: 4, right: 8 },
    },
    legend: { show: false },
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 5] },
    tooltip: { theme: "dark" },
    xaxis: {
      categories: weeklyCompletion.map((item) => item.day),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: chartText } },
    },
    yaxis: { labels: { style: { colors: chartText } } },
  };

  return (
    <div
      role="img"
      aria-label="Weekly completion trend: 45 tasks completed out of 55 planned."
    >
      <Chart
        options={options}
        series={[
          {
            name: "Completed",
            data: weeklyCompletion.map((item) => item.completed),
          },
          {
            name: "Planned",
            data: weeklyCompletion.map((item) => item.planned),
          },
        ]}
        type="area"
        height={300}
      />
    </div>
  );
}

export function PriorityChart() {
  const options: ApexOptions = {
    chart: { fontFamily: "inherit" },
    colors: ["#F6B94A", "#579DFF", "#9B72FF"],
    dataLabels: { enabled: false },
    labels: ["High", "Medium", "Low"],
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "78%" } } },
    stroke: { width: 0 },
    tooltip: { theme: "dark" },
  };

  return (
    <div
      role="img"
      aria-label="Task priority distribution: 3 high, 6 medium, and 3 low priority tasks."
    >
      <Chart options={options} series={[3, 6, 3]} type="donut" height={190} />
    </div>
  );
}
