import Users from '../components/Users';
import CheckInUsers from '../components/CheckInUsers';
import Lottie from 'lottie-react';
// import circleAnimation from '../lottie-files/circle-animation.json';
import weightLifting from '../lottie-files/weightlifting.json';

const Home = () => {
  return (
    <div className="container md:px-10 px-7">
      <div className="md:flex flex-row ">
        <div className="basis-1/2">
          <h1 className="text-8xl font-bold">Hello Owner</h1>
          <div className=" md:flex flex-row gap-2 ">
            <Users />
            <CheckInUsers />
          </div>
        </div>
        <div className="basis-1/2">
          {/* <Lottie className="" animationData={circleAnimation} /> */}
          <Lottie animationData={weightLifting} />
        </div>
      </div>
    </div>
  );
};

export default Home;
