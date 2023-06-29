import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CheckInUsers = () => {
  const [users, setUsers] = useState([]);
  const getCheckIn = async () => {
    const data = await fetch('http://localhost:7000/api/v1/gym/1');
    const data1 = await data.json();
    setUsers(data1.data.members);
    console.log(data1.data.members);
  };
  useEffect(() => {
    getCheckIn();
  }, []);

  return (
    <div className="plain-card w-full">
      <h1 className="text-2xl font-bold">CheckIn Users</h1>
      <hr />
      {users.map((user) => (
        <div>
          <div
            className="flex flex-row justify-start text-2xl items-center"
            key={user._id}>
            <h1>{user.name}</h1>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CheckInUsers;
