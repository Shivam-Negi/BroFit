import { useEffect, useState } from 'react';
import TodayAttendance from '../components/todayAttendance';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    fetch('/attendance')
      .then((res) => res.json())
      .then((data) => {
        setAttendance(data);
      }, []);
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Attendance</h1>
      <TodayAttendance />
      <div>
        {attendance.map((attendance) => (
          <div
            className="flex flex-row justify-center items-center"
            key={attendance._id}>
            <h1>{attendance.name}</h1>
            <h1>{attendance.date}</h1>
            <h1>{attendance.time}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
