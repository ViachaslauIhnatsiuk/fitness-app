import React, { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BarChartProps } from './models';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: FC<Partial<BarChartProps>> = ({
  positionLegend = 'top',
  title = ' Default Title',
  labels = [],
  data = [],
  color = '#fffffff0',
  borderColor = '#ffffff0f'
}) => {
  ChartJS.defaults.color = color;
  ChartJS.defaults.borderColor = borderColor;

  const options = {
    responsive: true,
    layout: {
      padding: 0
    },
    plugins: {
      legend: {
        position: positionLegend,
        labels: {
          font: {
            size: 14
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
    responsive: true,
    labels: [],
    datasets: [
      {
        label: labels[0],
        data: data[0],
        backgroundColor: ['rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 0,
        barThickness: 10
      },
      {
        label: labels[1],
        data: data[1],
        backgroundColor: ['rgba(153, 102, 255, 0.5)'],
        borderColor: ['rgba(153, 102, 255, 1)'],
        borderWidth: 0,
        barThickness: 10
      }
    ]
  };

  return <Bar options={options} data={resultedData} />;
};

export { BarChart };
