import React, { FC } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import s from './PieChart.module.css';
import { PieChartProps } from './models';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart: FC<Partial<PieChartProps>> = ({ data, labels }) => {
  const options = {
    responsive: true,
    layout: {
      padding: 0
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16
          }
        }
      }
    }
  };

  const resultedData = {
    labels,
    redraw: true,
    datasets: [
      {
        label: '# of Votes',
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  return (
    <div className={s.wrapper}>
      <Pie options={options} data={resultedData} />
    </div>
  );
};

export { PieChart };
