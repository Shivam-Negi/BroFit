import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useFetcher } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import api from '../api/api';

const Plans = () => {
  const [plans, setPlans] = useState([]);

  const getPlans = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/gym/1');
      const data1 = response.data;
      setPlans(data1.data.plans);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const Delete = async (planId) => {
    try {
      await api.delete(`http://localhost:7000/api/v1/plan/${planId}`);
      getPlans();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center">
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
              <ButtonContainer>
                <Button onClick={() => Delete(plan.id)}> Delete</Button>
                <Button as={Link} to={`/plan/${plan.id}/edit`}>
                  {' '}
                  Update
                </Button>
              </ButtonContainer>
            </div>
          </div>
        ))}
      </div>
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
