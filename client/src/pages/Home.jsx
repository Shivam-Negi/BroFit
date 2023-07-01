import React from 'react';
import Users from '../components/Users';
import CheckInUsers from '../components/CheckInUsers';
import DailyAttendance from '../components/DailyAttendance';
import Lottie from 'lottie-react';
import weightLifting from '../lottie-files/weightlifting.json';

const Home = () => {
  return (
    <div className="container md:px-10 px-7">
      <div className="md:flex flex-row ">
        <div className="basis-1/2">
          <h1 className="text-8xl font-bold md:mb-10 mb-5">Hello Owner</h1>
          <div className=" md:flex flex-row gap-2 mb-10 ">
            <Users />
            <CheckInUsers />
          </div>
          <DailyAttendance />
        </div>
        <div className="basis-1/2 self-center">
          <Lottie animationData={weightLifting} />
        </div>
      </div>
    </div>
  );
};

export default Home;
