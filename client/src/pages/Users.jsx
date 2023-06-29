// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import User from '../components/Users';
import CheckInUsers from '../components/CheckInUsers';

const Users = () => {
  return (
    <div className="container md:px-10 px-7">
      <h1 className="text-8xl font-bold">Hello Owner</h1>
      <div className="md:flex flex-row justify-between gap-1">
        <CheckInUsers className="basis-1/2 w-full" />
        <User className="basis-1/2 " />
      </div>
    </div>
  );
};

export default Users;
