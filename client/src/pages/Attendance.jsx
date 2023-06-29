import { useEffect, useState } from 'react';
import TodayAttendance from '../components/todayAttendance';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  const token = localStorage.getItem('token');
  console.log(token);

  const getAttendance = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/attendance', {
        headers: {
          'x-access-token': token,
        },
      });
      const data = await response.json(); // Extract JSON data from the response
      setAttendance(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Attendance</h1>
      <TodayAttendance />
      <div>
        {attendance.map((attendance) => (
          <div
            className="flex flex-row justify-center items-center"
            key={attendance._id}>
            <h1>{attendance.checkIn}</h1>
            <h1>{attendance.checkOut}</h1>
            <h1>{attendance.day}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
