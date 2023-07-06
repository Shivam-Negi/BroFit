import Lottie from 'lottie-react';
import proteinBar from '../lottie-files/92554-protein-bars.json';

const Loading = () => {
  return <Lottie className="w-2/4 m-auto" animationData={proteinBar} />;
};

export default Loading;
