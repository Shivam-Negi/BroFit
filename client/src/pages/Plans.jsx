import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Plans = () => {
  const [plans, setPlans] = useState([]);

  const getPlans = async () => {
    const data = await fetch('http://localhost:7000/api/v1/gym/1');
    const data1 = await data.json();
    setPlans(data1.data.plans); // corrected variable name
    console.log(data1.data.plans);
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Card>
        <h1 className="text-3xl font-bold">Plans</h1>
        {plans.map((plan) => (
          <Card key={plan.id}>
            <Link to={`/plan/${plan.id}`}>
              <h1>{plan.name}</h1>
              <p>{plan.price}</p>
              <p>{plan.validity}</p>
            </Link>
          </Card>
        ))}
      </Card>
    </div>
  );
};

const Card = styled.div`
  background: #fff;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Plans;
