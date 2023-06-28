import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
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
    <StyleSheetManager>
      <div className=" container flex flex-col justify-center items-center">
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
`;

export default Plans;
