import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  const getPlans = async () => {
    const data = await fetch('http://localhost:7000/api/v1/gym/1');
    const data1 = await data.json();
    setUsers(data1.data.members); // corrected variable name
    console.log(data1.data.members);
  };

  useEffect(() => {
    getPlans();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="flex flex-col justify-center items-center">
        {users.map((user) => (
          <div
            className="flex flex-row justify-center items-center"
            key={user._id}>
            <h1>
              <Link to={`/users/${user._id}`}>{user.name}</Link>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
