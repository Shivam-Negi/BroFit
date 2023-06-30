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
    <div className="container md:px-10 px-7">
      <h1 className="text-3xl font-bold">Attendance</h1>
      {/* <TodayAttendance /> */}
      <div className=" md:flex flex-row gap-2">
        {attendance.map((attendance) => (
          <div key={attendance._id}>
            <div className="plain-card">
              <h1>{attendance.checkIn}</h1>
              <h1>{attendance.checkOut}</h1>
              <h1>{attendance.day}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
