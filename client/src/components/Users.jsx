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
    <div className="plain-card">
      <h2 className=" font-bold text-2xl ">Checked-In Users</h2>
      <hr />
      <div className="flex flex-col  ">
        {users.map((user) => (
          <div
            className="flex flex-row justify-start items-center"
            key={user._id}>
            <h1>
              <Link className="  text-2xl " to={`/users/${user._id}`}>
                {user.name}
              </Link>
              <hr />
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
