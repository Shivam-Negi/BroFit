import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../api/api';

const Plans = () => {
  const [plans, setPlans] = useState([]);

  const getPlans = async () => {
    try {
      const response = await api.get('/gym/1');
      const data1 = response.data;
      setPlans(data1.data.plans);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <div className=" container flex flex-col justify-center items-center">
      <div className="plain-card">
        <h1 className="text-3xl font-bold">Plans</h1>
        {plans.map((plan) => (
          <div key={plan.price}>
            <div className="plain-card">
              <Link to={`/plan/${plan.id}`}>
                <h1>{plan.name}</h1>
                <p>{plan.price}</p>
                <p>{plan.validity}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
