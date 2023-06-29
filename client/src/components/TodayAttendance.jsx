import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TodayAttendance = () => {
  const [data, setData] = useState([]);
  const getAttendance = async () => {
    try {
      const response = await fetch(
        'http://localhost:7000/api/v1/1/attendance/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);
  console.log(data);

  return (
    <div className="container">
      <div className="plain-card"></div>
    </div>
  );
};

export default TodayAttendance;
