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
  const [chartData, setChartData] = useState([]);
  const [maxNumber, setMaxNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/gym/graph/2');
      if (response.ok) {
        const resData = await response.json();
        setChartData(resData.data);
        const newMaxNumber = Math.max(...resData.data) + 1;
        setMaxNumber(newMaxNumber);
        setIsLoading(false);
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Add an empty dependency array

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
        max: maxNumber,
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
