import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import DayExtractor from '../components/DayExtractor';

import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const calendarRef = useRef(null);

  const token = localStorage.getItem('token');
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
      setUser(responseData.data);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      const calendarEl = calendarRef.current;
      const calendar = new Calendar(calendarEl, {
        plugins: [interactionPlugin, dayGridPlugin],
        initialView: 'dayGridMonth',
        contentHeight: '400px',
        contentWidth: '400px%',
        events: user.attendance.map((attendance) => ({
          title: 'Attendance',
          start: attendance.checkIn,
          end: attendance.checkOut,
        })),
      });
      calendar.render();
    }
  }, [user]);

  if (user === null) {
    return <Loading />;
  }

  return (
    <div className="md:px-10 px-7">
      <div className="container ">
        <div className="md:flex flex-row gap-2">
          <div className=" basis-1/4 plain-card text-xl font-bold">
            <img
              src="https://th.bing.com/th/id/OIP.SnYzh4lsfrOarIgl_axMNgHaFF?pid=ImgDet&rs=1"
              alt="ProfilePic"
            />
            <h1>{user.userId.name}</h1>
            <h1>{user.userId.email}</h1>
            <hr />
            <h1 className="text-left">Height: {user.weight}</h1>
            <h1 className="text-left">Weight: {user.weight}</h1>
            <h1 className="text-left">Plan: {user.plan.plan}</h1>
          </div>
          <div className=" basis-1/4 plain-card">
            {user.attendance.map((attendance) => (
              <div className="text-left" key={attendance.id}>
                <h1 className="font-bold text-2xl">Attendance:</h1>
                <h1>CheckIn: {attendance.checkIn}</h1>
                <h1>CheckOut: {attendance.checkOut}</h1>
                <h1>
                  <DayExtractor timestamp={timestamp} />
                </h1>
              </div>
            ))}
          </div>
          <div className="basis-1/2 plain-card w-full">
            <div ref={calendarRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
