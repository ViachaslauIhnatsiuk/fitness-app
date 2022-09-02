import React, { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LineChartProps } from './models';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: FC<Partial<LineChartProps>> = ({ data, labels = [], title = 'Default Title' }) => {
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
        label: labels[0],
        data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointBorderColor: 'rgba(0, 0, 0, 0.0)',
        tension: 0.4
      },
      {
        label: labels[1],
        data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointBorderColor: 'rgba(0, 0, 0, 0.0)',
        tension: 0.4
      }
    ]
  };

  return <Line options={options} data={resultedData} />;
};

export { LineChart };
