// src/components/YieldChart.tsx

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  Legend,
  Title,
} from "chart.js";
import { YieldPlanResult } from "@/lib/apySimulator";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  Legend,
  Title
);

interface YieldChartProps {
  data: YieldPlanResult;
}

export default function YieldChart({ data }: YieldChartProps) {
  const chartData = {
    labels: data.timeline.map((point) => `Month ${point.month}`),
    datasets: [
      {
        label: "Projected Value",
        data: data.timeline.map((point) => point.value),
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.2)", // Tailwind's emerald-500 with opacity
        borderColor: "rgba(16, 185, 129, 1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Yield Projection",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (tickValue: string | number): string {
            return `$${tickValue}`;
          },
        },
      },
    },
  };  

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Line data={chartData} options={options} />
    </div>
  );
}
