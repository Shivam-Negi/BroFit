import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DailyAttendance = () => {
  const [chartData, setChartData] = useState({});
  const getData = () => {
const graphdata = async () => {
  const response = await fetch('/api/graphdata');
  // const Gdata = await response.json();
  // console.log(Gdata);
  // setChartData({

  // };

  useEffect(() => {
    getData();
  }, []);

  const data = {
    labels: [
      '12AM',
      '1AM',
      '2AM',
      '3AM',
      '4AM',
      '5AM',
      '6AM',
      '7AM',
      '8AM',
      '9AM',
      '10AM',
      '11AM',
      '12PM',
      '1PM',
      '2PM',
      '3PM',
      '4PM',
      '5PM',
      '6PM',
      '7PM',
      '8PM',
      '9PM',
      '10PM',
      '11PM',
    ],
    datasets: [
      {
        label: 'Hourly User Count',
        data: [
          10, 20, 30, 40, 50, 60, 70, 80, 90, 80, 70, 60, 50, 40, 30, 20, 10,
          20, 30, 40, 50, 60, 70, 80,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div>
      <h1>Hourly User Count</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DailyAttendance;
