import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Plans = () => {
  const [plans, setPlans] = useState([]);

  const getPlans = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/gym/1');
      const data = await response.json(); // Extract JSON data from the response
      setPlans(data.data.plans);
      console.log(data.data.plans);
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

  // const Update = async (planId) => {
  //   try {

  return (
    <div className="container md:px-10 px-7">
      <div className="md:flex flex-row justify-center ">
        <div className="plain-card">
          <h1 className="text-3xl content-center font-bold mb-5 ">Plans</h1>
          <div className="md:flex flex-row gap-1 ">
            {plans.map((plan) => (
              <div key={plan.plan}>
                <div className="plain-card text-xl">
                  <h1>{plan.plan}</h1>
                  <p>{plan._id}</p>
                  <p>{plan.price}</p>
                  <p>{plan.validity}</p>
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
      </div>
    </div>
  );
};
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
