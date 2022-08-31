import React, { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AreaChartProps } from './models';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const AreaChart: FC<Partial<AreaChartProps>> = ({ data, labels = [], title = 'Default Title' }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 16
          }
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 22
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: { min: 0 }
    }
  };

  const resultedData = {
    labels: [],
    datasets: [
      {
        fill: true,
        label: labels[0],
        data,
        borderColor: 'rgb(53, 162, 235, 0.9)',
        backgroundColor: 'rgba(53, 162, 235, 0.3)',
        tension: 0.4
      },
      {
        fill: true,
        label: labels[1],
        data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
        hidden: true
      }
    ]
  };
  return <Line options={options} data={resultedData} />;
};

export { AreaChart };
