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
    <StyleSheetManager>
      <div className="container flex flex-col justify-center items-center">
        <Card>
          <h1 className="text-3xl font-bold">Plans</h1>
          {plans.map((plan) => (
            <div key={plan.price}>
              <Card>
                <Link to={`/plan/${plan.id}`}>
                  <h1>{plan.name}</h1>
                  <p>{plan.price}</p>
                  <p>{plan.validity}</p>
                </Link>
                <ButtonContainer>
                  <Button onClick={() => Delete(plan.id)}> Delete</Button>
                  <Button as={Link} to={`/plan/${plan.id}/edit`}> Update</Button>
                </ButtonContainer>
              </Card>
            </div>
          ))}
        </Card>
      </div>
    </StyleSheetManager>
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
  h1 {
    color: black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  background color:green;
`;

const Button = styled.button`
  background: white;
  color: blue;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: yellow;
  }
`;

export default Plans;
