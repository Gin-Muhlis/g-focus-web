"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type { ApexOptions } from "apexcharts";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { weeklyCompletion } from "@/lib/dashboard-data";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartText = "#A4ADC1";
const grid = "rgba(255,255,255,0.06)";

type CompletionPoint = (typeof weeklyCompletion)[number];

export function ProductivityChart({
  data = weeklyCompletion,
}: {
  data?: CompletionPoint[];
}) {
  const hasData = data.some((item) => item.completed > 0 || item.planned > 0);

  if (!hasData) {
    return (
      <EmptyState
        className="mt-6 min-h-[300px] place-content-center"
        title="Your productivity pulse starts here"
        description="Complete or plan a task to reveal your weekly completion trend."
        action={
          <Button asChild size="sm">
            <Link href="/app/today">Plan today</Link>
          </Button>
        }
      />
    );
  }

  const completedTotal = data.reduce(
    (total, item) => total + item.completed,
    0,
  );
  const plannedTotal = data.reduce((total, item) => total + item.planned, 0);
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
      categories: data.map((item) => item.day),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: chartText } },
    },
    yaxis: { labels: { style: { colors: chartText } } },
  };

  return (
    <div
      role="img"
      aria-label={`Weekly completion trend: ${completedTotal} tasks completed out of ${plannedTotal} planned.`}
    >
      <Chart
        options={options}
        series={[
          {
            name: "Completed",
            data: data.map((item) => item.completed),
          },
          {
            name: "Planned",
            data: data.map((item) => item.planned),
          },
        ]}
        type="area"
        height={300}
      />
    </div>
  );
}

export function PriorityChart({
  series = [3, 6, 3],
}: {
  series?: [number, number, number];
}) {
  if (series.every((value) => value === 0)) {
    return (
      <EmptyState
        className="my-5 py-8"
        title="No open priorities"
        description="New tasks will appear here once you add them to your plan."
        action={
          <Button asChild size="sm">
            <Link href="/app/today">Add a task</Link>
          </Button>
        }
      />
    );
  }

  const [high, medium, low] = series;
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
      aria-label={`Task priority distribution: ${high} high, ${medium} medium, and ${low} low priority tasks.`}
    >
      <Chart options={options} series={series} type="donut" height={190} />
    </div>
  );
}
