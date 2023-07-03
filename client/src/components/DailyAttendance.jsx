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

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/gym/graph/2');
      if (response.ok) {
        const resData = await response.json();
        setChartData(resData.data); // Set the fetched data to the chartData state
        console.log(resData);
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
    // Fetch data every 5 minutes (300,000 milliseconds)
    const interval = setInterval(() => {
      getData();
    }, 300000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
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
        data: chartData,
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
        max: 10,
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
