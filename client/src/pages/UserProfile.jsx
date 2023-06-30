import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import DayExtractor from '../components/DayExtractor';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const token = localStorage.getItem('token');
  console.log(token);
  const timestamp = '2023-06-29T11:06:16.824Z';
  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/v1/userProfile/${id}`,
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData.data);
      setUser(responseData.data); // Set user without wrapping in an array
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    () => {
      getUser();
    },
    [],
    2000
  );

  if (user === null) {
    return <Loading />;
  }

  return (
    <div className="container md:px-10 px-7">
      <div className=" md:flex flex-row gap-2">
        <div className="plain-card text-xl fonr-bold ">
          <img
            src="https://th.bing.com/th/id/OIP.SnYzh4lsfrOarIgl_axMNgHaFF?pid=ImgDet&rs=1"
            alt="ProfilePic"
          />
          <h1>{user.userId.name}</h1>
          <h1>{user.userId.email}</h1>
          <hr />
          <h1 className="text-left">height: {user.weight}</h1>
          <h1 className="text-left">weight: {user.weight}</h1>
          <h1 className="text-left">Plan:{user.plan.plan}</h1>
        </div>
        <div className="plain-card ">
          {user.attendance.map((user) => {
            return (
              <div className="text-left" key={user.id}>
                <h1 className="font-bold text-2xl">Attendance:</h1>
                <h1>CheckIn: {user.checkIn}</h1>
                <h1>CheckOut: {user.checkOut}</h1>
                <h1>
                  <DayExtractor timestamp={timestamp} />
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
