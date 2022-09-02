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
import s from './BarChart.module.css';
import { BarChartProps } from './models';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: FC<Partial<BarChartProps>> = ({
  positionLegend = 'top',
  title = ' Default Title',
  labels = [],
  data,
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
        backgroundColor: ['rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 2
      },
      {
        label: labels[1],
        data,
        backgroundColor: ['rgba(153, 102, 255, 0.5)'],
        borderColor: ['rgba(153, 102, 255, 1)'],
        borderWidth: 2
      }
    ]
  };

  return <Bar options={options} data={resultedData} />;
};

export { BarChart };
