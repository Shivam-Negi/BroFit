import Users from '../components/Users';
import Lottie from 'lottie-react';
import circleAnimation from '../lottie-files/circle-animation.json';
import weightLifting from '../lottie-files/weightlifting.json';

const Home = () => {
  return (
    <div className="container md:px-10 px-7">
      <h1 className="text-8xl font-bold">Hello Owner</h1>
      <div className="md:flex flex-row ">
        <div>
          <Users className=" h-16" />
          <Users className=" h-16" />
        </div>

        {/* <Lottie className="" animationData={circleAnimation} /> */}
        <Lottie className="w-2/4" animationData={weightLifting} />
      </div>
    </div>
  );
};

export default Home;
