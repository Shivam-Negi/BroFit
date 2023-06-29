import React from 'react';

const DayExtractor = ({ timestamp }) => {
  const date = new Date(timestamp);
  date.setDate(date.getDate() - date.getDay());
  const dayOfWeek = date.getDay();

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return <div>Day: {daysOfWeek[dayOfWeek]}</div>;
};

export default DayExtractor;
