import Lottie from 'lottie-react';
import Dinosaur from '../lottie-files/dinosaur-sticker.json';

const Loading = () => {
  return <Lottie className="w-2/4 m-auto" animationData={Dinosaur} />;
};

export default Loading;
